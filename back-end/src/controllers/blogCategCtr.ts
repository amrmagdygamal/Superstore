import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateMongoDbId } from '../Util/validateMongodbId';
import prodCategModel from '../model/prodcategoryModel';

export const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const newCategory = await prodCategModel.create(req.body);

    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id)
  try {
    const updatedCategory = await prodCategModel.findByIdAndUpdate(
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
  validateMongoDbId(_id)
  try {
    const deletedcategory = await prodCategModel.findByIdAndDelete(_id);

    res.json(deletedcategory);
  } catch (error) {
    next(error);
  }
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id)
  try {
    const getcategory = await prodCategModel.findById(
      _id
    );

    res.json(getcategory);
  } catch (error) {
    next(error);
  }
});

export const getAllCategoies = asyncHandler(async (req, res, next) => {
  try {
    const allcategories = await prodCategModel.find();

    res.json(allcategories);
  } catch (error) {
    next(error);
  }
});
