import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import blogModel from '../model/blogModel';
import { cloudinaryUploadImg } from '../Util/cloudinary';
import fs from 'fs';

export const uploadImages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uploader = (path: any) => cloudinaryUploadImg(path, 'images');

      const urls = [];
      const files: any = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath: any = await uploader(path);
        urls.push(newpath);

        fs.unlinkSync(path);
      }
      const images = urls.map((file) => {
        return file;
      });
      res.json(images);
    } catch (error) {
      next(error);
    }
  }
);

export const createBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBlog = await blogModel.create(req.body);
      res.json(newBlog);
    } catch (error) {
      next(error);
    }
  }
);

export const updateBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const updateBlog = await blogModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.json(updateBlog);
    } catch (error) {
      next(error);
    }
  }
);

export const getBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const getblog = await blogModel
        .findById(id)
        .populate('likes')
        .populate('dislikes');
      const updateViews = await blogModel.findByIdAndUpdate(
        id,
        {
          $inc: { numViews: 1 },
        },
        { new: true }
      );
      res.json(getblog);
    } catch (error) {
      next(error);
    }
  }
);

export const getAllBloggs = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getBlogs = await blogModel.find();
      res.json(getBlogs);
    } catch (error) {
      next(error);
    }
  }
);

export const deleteBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const deleteblog = await blogModel.findByIdAndDelete(id);

      res.json(deleteblog);
    } catch (error) {
      next(error);
    }
  }
);

export const likeTheBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.body;
    try {
      // Find The blog which you want to like
      const blog = await blogModel.findById(blogId);
      // Find The loged User
      const logedUserId = req?.user?._id;
      // Find If the user liked the blog
      const alreadyLiked = blog?.isLiked;
      // Find if the user disliked the blog
      const disLiked = blog?.dislikes?.find(
        (userId) => userId?.toString() === logedUserId?.toString()
      );
      if (disLiked) {
        const blog = await blogModel.findByIdAndUpdate(
          blogId,
          {
            $pull: { dislikes: logedUserId },
            isDisliked: false,
          },
          { new: true }
        );
        res.json(blog);
      }
      if (alreadyLiked) {
        const blog = await blogModel.findByIdAndUpdate(
          blogId,
          {
            $pull: { likes: logedUserId },
            isLiked: false,
          },
          { new: true }
        );
        res.json(blog);
      } else {
        const blog = await blogModel.findByIdAndUpdate(
          blogId,
          {
            $push: { likes: logedUserId },
            isLiked: true,
          },
          { new: true }
        );
        res.json(blog);
      }
    } catch (error) {
      next(error);
    }
  }
);

export const disLikeTheBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.body;
    try {
      // Find The blog which you want to like
      const blog = await blogModel.findById(blogId);
      // Find The loged User
      const logedUserId = req?.user?._id;
      // Find If the user liked the blog
      const alreadyDisliked = blog?.isDisliked;
      // Find if the user disliked the blog
      const liked = blog?.likes?.find(
        (userId) => userId?.toString() === logedUserId?.toString()
      );
      if (liked) {
        const blog = await blogModel.findByIdAndUpdate(
          blogId,
          {
            $pull: { likes: logedUserId },
            isLiked: false,
          },
          { new: true }
        );
        res.json(blog);
      }
      if (alreadyDisliked) {
        const blog = await blogModel.findByIdAndUpdate(
          blogId,
          {
            $pull: { dislikes: logedUserId },
            isDisLiked: false,
          },
          { new: true }
        );
        res.json(blog);
      } else {
        const blog = await blogModel.findByIdAndUpdate(
          blogId,
          {
            $push: { dislikes: logedUserId },
            isDisliked: true,
          },
          { new: true }
        );
        res.json(blog);
      }
    } catch (error) {
      next(error);
    }
  }
);
