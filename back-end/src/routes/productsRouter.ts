import express from 'express';
import ProductModel, { Product } from '../model/ProductModel';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';

const productRouter = express.Router();

productRouter.post(
  '/',
  auhtMiddleware,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const newProduct = await ProductModel.create(req.body);
      res.json(newProduct);
    } catch (error) {
      next(error);
    }
  })
);

productRouter.put(
  '/:id',
  auhtMiddleware,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    const { _id } = req.params;
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      const updateProduct = await ProductModel.findOneAndUpdate(
        { _id },
        req.body,
        { new: true }
      );

      res.json(updateProduct);
    } catch (error) {
      next(error);
    }
  })
);

productRouter.delete(
  '/:id',
  auhtMiddleware,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    const { _id } = req.params;
    try {
      const deleteProduct = await ProductModel.findOneAndDelete({ _id });

      res.json(deleteProduct);
    } catch (error) {
      next(error);
    }
  })
);

productRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    try {
      // Filtering

      const queryOb = { ...req.query };

      const excludeFields = ['page', 'sort', 'limit', 'fields'];
      excludeFields.forEach((el) => delete queryOb[el]);
      let queryStr = JSON.stringify(queryOb);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      let query = ProductModel.find(JSON.parse(queryStr));

      // Sorting 

      const sort = req.query.sort;
      if (typeof sort === 'string') {
        const sortBy = sort.split(',').join(' ');
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt');
      }

      // Limiting the fields

      const field = req.query.fields;
      if (typeof field === 'string') {
        const fields = field.split(',').join(' ');
        query = query.sort(fields);
      } else {
        query = query.select('-__v')
      }


      // pagination 

      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      if (req.query.page) {
        const productCount = await ProductModel.countDocuments();
        if(skip >= productCount) throw new Error('This Page does not exists');
      }


      const product = await query;
      res.json(product);
    } catch (error) {
      next(error);
    }
  })
);

productRouter.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    try {
      const { _id } = req.params;
      const findProduct = await ProductModel.findById(_id);

      res.json(findProduct);
    } catch (error) {
      next(error);
    }
  })
);

productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not found.' });
    }
  })
);

export default productRouter;
