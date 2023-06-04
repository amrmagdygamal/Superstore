import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Product } from '../model/ProductModel';
import * as OrderControllers from '../controllers/orderCtr'
import { auhtMiddleware } from '../middlewares/authentication';

const orderRouter = express.Router();




orderRouter.get(
  '/ordershistory',
  auhtMiddleware,
  OrderControllers.getOrders
)


orderRouter.get(
  '/:id',
  auhtMiddleware,
  OrderControllers.getOrder
);


orderRouter.post(
  '/',
  auhtMiddleware,
  OrderControllers.createOrder
)



orderRouter.put(
  '/:id/pay',
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      res.json({ order: updatedOrder, message: 'Order Paid Successfully' });
    } else {
      res.status(404).json({ message: 'Order Not found' });
    }
  })
);







export default orderRouter;
