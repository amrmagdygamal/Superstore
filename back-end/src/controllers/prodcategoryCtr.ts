import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../Util/token';
import { validateMongoDbId } from '../Util/validateMongodbId';
import categoryModel from '../model/prodcategoryModel';

export const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const newCategory = await categoryModel.create(req.body);

    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
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
  try {
    const deletedcategory = await categoryModel.findByIdAndDelete(_id);

    res.json(deletedcategory);
  } catch (error) {
    next(error);
  }
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  try {
    const getcategory = await categoryModel.findById(
      _id
    );

    res.json(getcategory);
  } catch (error) {
    next(error);
  }
});

export const getAllCategoies = asyncHandler(async (req, res, next) => {
  try {
    const allcategories = await categoryModel.find();

    res.json(allcategories);
  } catch (error) {
    next(error);
  }
});
