/* eslint-disable @typescript-eslint/no-unused-vars */
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import OrderModel from '../model/OrderModel';
import {UserModel} from '../model/UserModel';
import CartModel from '../model/CartModel';
import uniqid from 'uniqid';
import ProductModel from '../model/ProductModel';

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
    const orderData = req.body;
    const _id  = req.user?._id;

    try {
      const user = await UserModel.findById(_id);
      const userCart = await CartModel.findOne({ customer: user?._id });

      let finalAmount = 0;

      if (userCart?.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount;
      } else {
        finalAmount = userCart?.cartTotal ?? 0;
      }

      const newOrder = await new OrderModel({
        products: userCart?.products,
        shippingAddress: {
          firstName: orderData?.shippingAddress?.firstName,
          lastName: orderData?.shippingAddress?.lastName,
          country:orderData?.shippingAddress.country,
          city:orderData?.shippingAddress.city,
          address:orderData?.shippingAddress.address ?? "",
          postalCode:orderData?.shippingAddress.postalCode,
        },
        paymentResult: {
          paymentId: uniqid(),
          PaymentMethod: orderData?.paymentResult?.PaymentMethod ?? "PayPal",
          amount: finalAmount,
          shippingPrice: orderData?.paymentResult?.shippingPrice,
          taxPrice: orderData?.paymentResult?.taxPrice,
          totalPriceAfterDiscount: orderData?.paymentResult?.totalAfterDiscount,
          status: 'Not Processed',
          created: Date.now(),
          currency: 'usd',
        },
        orderby: user?._id,
      }).save();
      const update = userCart?.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product?._id },
            update: { $inc: { quantity: -item.quantity } },
          },
        };
      });

      if (update) {
        const updated = await ProductModel.bulkWrite(update, {});
      }

      res.status(201).json({ message: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

export const getUserOrders = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const _id  = req.user?._id;
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

export const getOrderByUserId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
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

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updateOrderStatus = await OrderModel.findOneAndUpdate(
      { id },
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

export const getOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const _id  = req.user?._id;

  try {
    const findOrder = await OrderModel.findOne({ orderby: _id });
    res.json(findOrder);
  } catch (error) {
    next(error);
  }
});



export const getAnOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;

  try {
    const findOrder = await OrderModel.findOne({ _id: id });
    res.json(findOrder);
  } catch (error) {
    next(error);
  }
});




export const getMonthWiseOrderIncome = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const date = new Date()
  let endDate = "";
  date.setDate(1)

  for (let index = 0; index < 11; index++) {
    date.setMonth(date.getMonth() - 1);
    endDate = monthNames[date.getMonth()] + " " + date.getFullYear();

  }

  const data = await OrderModel.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate)
        }
      }
    }, {
      $group: {
        _id: {
          month: "$month"
        }, amount : {$sum: "$totalPriceAfterDiscount"}, count : {$sum: 1}
      }
    }
  ])
  res.json(data)
})



export const getYearlyTotalOrders = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const date = new Date()
  let endDate = "";
  date.setDate(1)

  for (let index = 0; index < 11; index++) {
    date.setMonth(date.getMonth() - 1);
    endDate = monthNames[date.getMonth()] + " " + date.getFullYear();

  }

  const data = await OrderModel.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate)
        }
      }
    }, {
      $group: {
        _id: null,  count : {$sum: 1},
        amount: {$sum: "$totalPriceAfterDiscount"}
      }
    }
  ])
  res.json(data)
})


export const payOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await OrderModel.findById(req.params._id);

  if (order) {
    order.paidAt = new Date(Date.now());
    order.paymentResult = {
      PaymentMethod: req.body.paymentMethod, // assuming the payment method is sent in the request body
      paymentId: order?.paymentResult?.paymentId, // assuming the payment ID is sent in the request body
      amount: order?.paymentResult?.amount as number,
      shippingPrice: order?.paymentResult?.shippingPrice as number,
      taxPrice: order?.paymentResult?.taxPrice as number,
      totalPriceAfterDiscount: order?.paymentResult?.totalPriceAfterDiscount as number,
      status: 'Cash On Delivery',
    };
    const updatedOrder = await order.save();
    res.json({ order: updatedOrder, message: 'Order Paid Successfully' });
  } else {
    res.status(404).json({ message: 'Order Not found' });
  }
});
