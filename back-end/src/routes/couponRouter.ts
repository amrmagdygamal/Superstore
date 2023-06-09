import express from "express";
import * as CouponControllers from '../controllers/couponCtr'
import { auhtMiddleware, isAdmin } from "../middlewares/authentication";

const couponRouter = express.Router();


couponRouter.get('/', auhtMiddleware, isAdmin, CouponControllers.getAllCoupons);
couponRouter.get('/:id', auhtMiddleware, isAdmin, CouponControllers.getCoupon);
couponRouter.post('/', auhtMiddleware, isAdmin, CouponControllers.createCoupon);
couponRouter.put('/:id', auhtMiddleware, isAdmin, CouponControllers.updateCoupon);
couponRouter.delete('/:id', auhtMiddleware, isAdmin, CouponControllers.deleteCoupon);


export default couponRouter;