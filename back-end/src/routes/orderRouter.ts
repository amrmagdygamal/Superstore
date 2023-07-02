import express, {  } from 'express';
import * as OrderControllers from '../controllers/orderCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';

const orderRouter = express.Router();

orderRouter.get('/getallorders', auhtMiddleware,isAdmin,  OrderControllers.getAllOrders);
orderRouter.post('/', auhtMiddleware, OrderControllers.createOrder);


orderRouter.get('/ordershistory', auhtMiddleware, OrderControllers.getUserOrders);


orderRouter.get('/getorderbyuserid/:id', auhtMiddleware, isAdmin ,OrderControllers.getOrderByUserId);
orderRouter.get('/getMonthWiseOrderIncome', auhtMiddleware,OrderControllers.getMonthWiseOrderIncome);
orderRouter.get('/getyearlyorders', auhtMiddleware,OrderControllers.getYearlyTotalOrders);

orderRouter.put(
  '/updateorder/:id',
  auhtMiddleware,
  isAdmin,
  OrderControllers.updateOrderStatus
);

orderRouter.get('/:id', auhtMiddleware, OrderControllers.getOrder);
orderRouter.get('/getOrder/:id', auhtMiddleware, isAdmin,  OrderControllers.getAnOrder);


orderRouter.put('/:id/pay', auhtMiddleware, OrderControllers.payOrder);

export default orderRouter;
