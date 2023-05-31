import express from 'express';
import ProductModel from '../model/ProductModel';
import asyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.post(
  '/',
  asyncHandler(async(req, res, next) => {
    try {
      
      const newProduct = await ProductModel.create(req.body);
      res.json(newProduct);

    } catch (error) {
      next(error)
    }
  })
)

productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);


productRouter.get(
  '/:id',
  asyncHandler (async (req, res, next) => {
    try {
      const { _id }= req.params;
      const findProduct = await ProductModel.findById(_id);

      res.json(findProduct);

    } catch (error) {
      next(error)
    }
  })
)


productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not found.'})
    }
  })
);



export default productRouter;