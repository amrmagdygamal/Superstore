import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateMongoDbId } from '../Util/validateMongodbId';
import brandModel from '../model/brandModel';

export const createBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBrand = await brandModel.create(req.body);

    res.json(newBrand);
  } catch (error) {
    next(error);
  }
});

export const updateBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const updatedBrand = await brandModel.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );

    res.json(updatedBrand);
  } catch (error) {
    next(error);
  }
});

export const deletBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const deletedBrand = await brandModel.findByIdAndDelete(_id);

    res.json(deletedBrand);
  } catch (error) {
    next(error);
  }
});

export const getBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const getBrand = await brandModel.findById(
      _id
    );

    res.json(getBrand);
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
