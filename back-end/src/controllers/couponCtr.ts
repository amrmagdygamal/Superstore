import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import couponModel from '../model/couponModel';
export const createCoupon = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newcoupon = await couponModel.create(req.body);
    res.json(newcoupon)
  } catch (error) {
    next(error)
  }
})

export const getAllCoupons = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coupons = await couponModel.find();
    res.json(coupons)
  } catch (error) {
    next(error)
  }
});

export const getCoupon = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const getAcoupon = await couponModel.findById(id);
    res.json(getAcoupon);
  } catch (error) {
    next(error)
  }
});



export const updateCoupon = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const updatedcoupon = await couponModel.findByIdAndUpdate(id, req.body, {
    new: true,
    });
    res.json(updatedcoupon)
  } catch (error) {
    next(error)
  }
})


export const deleteCoupon = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const deletecoup = await couponModel.findByIdAndDelete(id);
    res.json(deletecoup)
  } catch (error) {
    next(error)
  }
})