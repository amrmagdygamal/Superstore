import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as OrderControllers from '../controllers/orderCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
import OrderModel from '../model/OrderModel';

const orderRouter = express.Router();

orderRouter.post('/', auhtMiddleware, OrderControllers.createOrder);


orderRouter.get('/ordershistory', auhtMiddleware, OrderControllers.getUserOrders);

orderRouter.get('/getallorders', auhtMiddleware,isAdmin,  OrderControllers.getAllOrders);

orderRouter.get('/getorderbyuserid/:id', auhtMiddleware, isAdmin ,OrderControllers.getOrderByUserId);

orderRouter.put(
  '/updateorder/:id',
  auhtMiddleware,
  isAdmin,
  OrderControllers.updateOrderStatus
);

orderRouter.get('/:id', auhtMiddleware, OrderControllers.getOrder);


orderRouter.put('/:id/pay', auhtMiddleware, OrderControllers.payOrder);

export default orderRouter;
