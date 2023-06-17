import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateMongoDbId } from '../Util/validateMongodbId';
import ProdCategoryModel from '../model/prodcategoryModel';

export const createCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = await ProdCategoryModel.create(req.body);

    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});



export const getCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const getcategory = await ProdCategoryModel.findById(
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
      const updatedCategory = await ProdCategoryModel.findByIdAndUpdate(
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
      const deletedcategory = await ProdCategoryModel.findByIdAndDelete(id);
  
      res.json(deletedcategory);
    } catch (error) {
      next(error);
    }
  });

export const getAllCategoies = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allcategories = await ProdCategoryModel.find();

    res.json(allcategories);
  } catch (error) {
    next(error);
  }
});
