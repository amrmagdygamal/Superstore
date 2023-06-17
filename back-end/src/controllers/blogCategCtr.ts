import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import blogCategModel from '../model/blogCategModel';


export const createCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = await blogCategModel.create(req.body);

    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});
export const getCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const getcategory = await blogCategModel.findById(
      id
    );

    res.json(getcategory);
  } catch (error) {
    next(error);
  }
});

export const updateCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const updatedCategory = await blogCategModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

export const deletCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedcategory = await blogCategModel.findByIdAndDelete(id);

    res.json(deletedcategory);
  } catch (error) {
    next(error);
  }
});


export const getAllCategoies = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allcategories = await blogCategModel.find();

    res.json(allcategories);
  } catch (error) {
    next(error);
  }
});
