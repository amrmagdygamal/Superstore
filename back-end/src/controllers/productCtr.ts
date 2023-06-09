import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ProductModel from '../model/ProductModel';
import {UserModel} from '../model/UserModel';


export const getAllProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Filtering

    const queryOb = { ...req.query };

    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryOb[el]);
    let queryStr = JSON.stringify(queryOb);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

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
      query = query.select('-__v');
    }

    // pagination

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await ProductModel.countDocuments();
      if (skip >= productCount) throw new Error('This Page does not exists');
    }

    const product = await query.populate('color').exec();
    res.json(product)
  } catch (error) {
    next(error);
  }
});
export const getProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const findProduct = await ProductModel.findById(id).populate("color").exec();

    res.json(findProduct);
  } catch (error) {
    next(error);
  }
});

export const createProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});
export const updateProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {

    const updateProduct = await ProductModel.findByIdAndUpdate(
      id ,
      req.body,
      { new: true }
    );

    res.json(updateProduct);
  } catch (error) {
    next(error);
  }
});
export const deleteProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    next(error);
  }
});


export const addToWishList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user?._id;

  const { prodId } = req.body;

  try {
    const user = await UserModel.findById(id);
    const alreadyadded = user?.wishlist.find(
      (id: string) => id.toString() === prodId.toString()
    );

    if (alreadyadded) {
      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

export const rating = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const _id = req.user?._id;

  const { star, prodId, comment } = req.body;

  try {
    const product = await ProductModel.findById(prodId);

    const alreadyRated = product?.ratings.find(
      (userId) => userId.postedBy?.toString() === _id?.toString()
    );

    if (alreadyRated) {
      const updateRating = await ProductModel.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await ProductModel.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }

    const getAllRatings = await ProductModel.findById(prodId);
    const totalrating = getAllRatings?.ratings.length;
    const ratingSum = getAllRatings?.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => (prev && curr ? prev + curr : 0), 0);
    const actualRating = Math.round(
      ratingSum && totalrating ? ratingSum / totalrating : 0
    );
    const finalprod = await ProductModel.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      {
        new: true,
      }
    );
    res.json(finalprod);
  } catch (error) {
    next(error);
  }
});


