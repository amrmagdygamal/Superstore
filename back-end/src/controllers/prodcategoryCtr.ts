import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateMongoDbId } from '../Util/validateMongodbId';
import ProdCategoryModel from '../model/prodcategoryModel';

export const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const newCategory = await ProdCategoryModel.create(req.body);

    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const updatedCategory = await ProdCategoryModel.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );

    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

export const deletCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const deletedcategory = await ProdCategoryModel.findByIdAndDelete(_id);

    res.json(deletedcategory);
  } catch (error) {
    next(error);
  }
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const getcategory = await ProdCategoryModel.findById(
      _id
    );

    res.json(getcategory);
  } catch (error) {
    next(error);
  }
});

export const getAllCategoies = asyncHandler(async (req, res, next) => {
  try {
    const allcategories = await ProdCategoryModel.find();

    res.json(allcategories);
  } catch (error) {
    next(error);
  }
});
