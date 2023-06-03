import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import couponModel from '../model/couponModel';
import { validateMongoDbId } from '../Util/validateMongodbId';

export const createCoupon = asyncHandler ( async (req, res, next) => {
  try {
    const newcoupon = await couponModel.create(req.body);
    res.json(newcoupon)
  } catch (error) {
    next(error)
  }
})

export const getAllCoupons = asyncHandler ( async (req, res, next) => {
  try {
    const coupons = await couponModel.find();
    res.json(coupons)
  } catch (error) {
    next(error)
  }
});



export const updateCoupon = asyncHandler ( async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);

  try {
    const updatedcoupon = await couponModel.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true
    });
    res.json(updatedcoupon)
  } catch (error) {
    next(error)
  }
})


export const deleteCoupon = asyncHandler ( async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);

  try {
    const deletecoup = await couponModel.findByIdAndDelete(_id);
    res.json(deletecoup)
  } catch (error) {
    next(error)
  }
})