import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import OrderModel from '../model/OrderModel';
import UserModel from '../model/UserModel';
import CartModel from '../model/CartModel';
import uniqid from 'uniqid';
import ProductModel from '../model/ProductModel';
import { validateMongoDbId } from '../Util/validateMongodbId';

// export const createOrder = asyncHandler(async (req: Request, res: Response) => {

//   if (req.body.products.length === 0) {
//     res.status(400).json({ message: 'Cart is empty' });
//   } else {
//     const createdOrder = await OrderModel.create({
//       orderItems: req.body.orderItems.map((x: Product) => ({
//         ...x,
//         product: x._id,
//       })),
//       shippingAddress: req.body.shippingAddress,
//       paymentMethod: req.body.paymentMethod,
//       itemsPrice: req.body.itemsPrice,
//       shippingPrice: req.body.shippingPrice,
//       taxPrice: req.body.taxPrice,
//       totalPrice: req.body.totalPrice,
//       user: req.user._id,
//     } as Order)
//     res.status(201).json({ message: 'Order Created', order: createdOrder })
//   }
// })

export const createOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user as { _id: string };

    try {
      if (!COD) {
        throw new Error('create chash order failed');
      }

      const user = await UserModel.findById(_id);
      const userCart = await CartModel.findOne({ customer: user?._id });

      let finalAmount = 0;

      if (couponApplied && userCart?.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount;
      } else {
        finalAmount = userCart?.cartTotal ?? 0;
      }

      const newOrder = await new OrderModel({
        products: userCart?.products,
        paymentResult: {
          paymentId: uniqid(),
          paymentMethod: 'COD',
          amount: finalAmount,
          status: 'Cash on Delivery',
          created: Date.now(),
          currency: 'usd',
        },
        orderby: user?._id,
        status: 'Cash on Delivery',
      }).save();
      const update = userCart?.products.map((item) => {
        return {
          updataOne: {
            filter: { _id: item.product?._id },
            update: { $inc: { quantity: item.quantity } },
          },
        };
      });

      const updated = await ProductModel.bulkWrite(update, {});

      res.status(201).json({ message: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

export const getUserOrders = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await OrderModel.find({ orderby: _id });

    res.json(userorders);
  } catch (error) {
    next(error);
  }
});

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const alluserorders = await OrderModel.find()
        .populate('products.product')
        .populate('orderby')
        .exec();
      res.json(alluserorders);
    } catch (error) {
      next(error);
    }
  }
);

export const getOrderByUserId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await OrderModel.findOne({ orderby: id })
      .populate('products.product')
      .populate('orderby')
      .exec();
    res.json(userorders);
  } catch (error) {
    next(error);
  }
});

export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const { _id } = req.params;
  validateMongoDbId(_id);

  try {
    const updateOrderStatus = await OrderModel.findOneAndUpdate(
      { _id },
      {
        status: status,
        paymentResult: {
          status: status,
        },
      },
      { new: true }
    );
  } catch (error) {
    next(error);
  }
});

export const getOrder = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  try {
    const findOrder = await OrderModel.findOne({orderby: _id});
    res.json(findOrder);
  } catch (error) {
    next(error);
  }
});


export const payOrder =   asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderModel.findById(req.params._id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date(Date.now());
    order.paymentResult = {
      paymentId: req.body.id,
      status: req.body.status,
    };
    const updatedOrder = await order.save();

    res.json({ order: updatedOrder, message: 'Order Paid Successfully' });
  } else {
    res.status(404).json({ message: 'Order Not found' });
  }
});