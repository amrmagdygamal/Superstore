import express from 'express';
import ProductModel from '../model/ProductModel';
import asyncHandler from 'express-async-handler';
import { Products } from '../data';

const productRouter = express.Router();

productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);

productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    res.json(product);
  })
);

productRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(Products)
    res.send({ createdProducts})
  })
)

export default productRouter;