import express from 'express';
import ProductModel from '../model/ProductModel';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';

const productRouter = express.Router();

productRouter.post(
  '/',
  auhtMiddleware,
  isAdmin,
  asyncHandler(async(req, res, next) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title)
      }
      const newProduct = await ProductModel.create(req.body);
      res.json(newProduct);

    } catch (error) {
      next(error)
    }
  })
)

productRouter.put(
  '/:id',
  auhtMiddleware,
  isAdmin,
  asyncHandler (async (req, res, next) => {

    const { _id } = req.params;
    try {
      
      if(req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      const updateProduct = await ProductModel.findOneAndUpdate({_id}, req.body, {new: true});

      res.json(updateProduct);
    } catch (error) {
      next(error)
    }

  })
)



productRouter.delete(
  '/:id',
  auhtMiddleware,
  isAdmin,
  asyncHandler (async (req, res, next) => {

    const { _id } = req.params;
    try {
      
      const deleteProduct = await ProductModel.findOneAndDelete({_id});

      res.json(deleteProduct);
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