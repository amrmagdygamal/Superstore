import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateMongoDbId } from '../Util/validateMongodbId';
import blogCategModel from '../model/blogCategModel';


export const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const newCategory = await blogCategModel.create(req.body);

    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id)
  try {
    const updatedCategory = await blogCategModel.findByIdAndUpdate(
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
    const deletedcategory = await blogCategModel.findByIdAndDelete(_id);

    res.json(deletedcategory);
  } catch (error) {
    next(error);
  }
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id)
  try {
    const getcategory = await blogCategModel.findById(
      _id
    );

    res.json(getcategory);
  } catch (error) {
    next(error);
  }
});

export const getAllCategoies = asyncHandler(async (req, res, next) => {
  try {
    const allcategories = await blogCategModel.find();

    res.json(allcategories);
  } catch (error) {
    next(error);
  }
});
