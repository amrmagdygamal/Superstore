import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateMongoDbId } from '../Util/validateMongodbId';
import EnquiryModel from '../model/EnquiryModel';

export const createEnquiry = asyncHandler(async (req, res, next) => {
  try {
    const newEnquiry = await EnquiryModel.create(req.body);

    res.json(newEnquiry);
  } catch (error) {
    next(error);
  }
});

export const updateEnquiry = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const updatedEnquiry = await EnquiryModel.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );

    res.json(updatedEnquiry);
  } catch (error) {
    next(error);
  }
});

export const deletEnquiry = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const deletedEnquiry = await EnquiryModel.findByIdAndDelete(_id);

    res.json(deletedEnquiry);
  } catch (error) {
    next(error);
  }
});

export const getEnquiry = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const getEnquiry = await EnquiryModel.findById(
      _id
    );

    res.json(getEnquiry);
  } catch (error) {
    next(error);
  }
});

export const getAllEnquirys = asyncHandler(async (req, res, next) => {
  try {
    const allEnquirys = await EnquiryModel.find();

    res.json(allEnquirys);
  } catch (error) {
    next(error);
  }
});
