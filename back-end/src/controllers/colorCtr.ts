import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ColorModel from '../model/ColorModel';

export const createColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newColor = await ColorModel.create(req.body);

    res.json(newColor);
  } catch (error) {
    next(error);
  }
});

export const getColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const getColor = await ColorModel.findById(
      id
    );

    res.json(getColor);
  } catch (error) {
    next(error);
  }
});

export const updateColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const updatedColor = await ColorModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedColor);
  } catch (error) {
    next(error);
  }
});

export const deletColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedColor = await ColorModel.findByIdAndDelete(id);

    res.json(deletedColor);
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
