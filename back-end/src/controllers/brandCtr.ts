import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateMongoDbId } from '../Util/validateMongodbId';
import brandModel from '../model/brandModel';

export const createBrand = asyncHandler(async (req, res, next) => {
  try {
    const newBrand = await brandModel.create(req.body);

    res.json(newBrand);
  } catch (error) {
    next(error);
  }
});

export const updateBrand = asyncHandler(async (req, res, next) => {
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

export const deletBrand = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const deletedBrand = await brandModel.findByIdAndDelete(_id);

    res.json(deletedBrand);
  } catch (error) {
    next(error);
  }
});

export const getBrand = asyncHandler(async (req, res, next) => {
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

export const getAllBrands = asyncHandler(async (req, res, next) => {
  try {
    const allbrands = await brandModel.find();

    res.json(allbrands);
  } catch (error) {
    next(error);
  }
});
