import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateMongoDbId } from '../Util/validateMongodbId';
import ColorModel from '../model/ColorModel';

export const createColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newColor = await ColorModel.create(req.body);

    res.json(newColor);
  } catch (error) {
    next(error);
  }
});

export const updateColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const updatedColor = await ColorModel.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );

    res.json(updatedColor);
  } catch (error) {
    next(error);
  }
});

export const deletColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const deletedColor = await ColorModel.findByIdAndDelete(_id);

    res.json(deletedColor);
  } catch (error) {
    next(error);
  }
});

export const getColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const getColor = await ColorModel.findById(
      _id
    );

    res.json(getColor);
  } catch (error) {
    next(error);
  }
});

export const getAllColors = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allColors = await ColorModel.find();

    res.json(allColors);
  } catch (error) {
    next(error);
  }
});
