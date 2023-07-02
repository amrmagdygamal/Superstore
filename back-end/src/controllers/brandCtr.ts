import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import brandModel from '../model/brandModel';

export const createBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBrand = await brandModel.create(req.body);

    res.json(newBrand);
  } catch (error) {
    next(error);
  }
});
export const getBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    
    const getBrand = await brandModel.findById(id);

    res.json(getBrand);
    console.log(getBrand)
  } catch (error) {
    next(error);
  }
});

export const updateBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const updatedBrand = await brandModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedBrand);
  } catch (error) {
    next(error);
  }
});

export const deletBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedBrand = await brandModel.findByIdAndDelete(id);

    res.json(deletedBrand);
  } catch (error) {
    next(error);
  }
});


export const getAllBrands = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allbrands = await brandModel.find();

    res.json(allbrands);
  } catch (error) {
    next(error);
  }
});
