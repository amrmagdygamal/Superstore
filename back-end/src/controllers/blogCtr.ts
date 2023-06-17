import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import blogModel from '../model/blogModel';
import { validateMongoDbId } from '../Util/validateMongodbId';

export const createBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBlog = await blogModel.create(req.body);
    res.json(newBlog);
  } catch (error) {
    next(error);
  }
});

export const updateBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const updateBlog = await blogModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.json(updateBlog);
  } catch (error) {
    next(error);
  }
});

export const getBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const getblog = await blogModel.findById(_id).populate("likes").populate("dislikes");
    const updateViews = await blogModel.findByIdAndUpdate(
      _id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getblog);
  } catch (error) {
    next(error);
  }
});

export const getAllBloggs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getBlogs = await blogModel.find();
    res.json(getBlogs);
  } catch (error) {
    next(error);
  }
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  validateMongoDbId(_id);
  try {
    const deleteblog = await blogModel.findByIdAndDelete(_id);

    res.json(deleteblog);
  } catch (error) {
    next(error);
  }
});


export const likeTheBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const { blogId } = req.body;
  validateMongoDbId(blogId);
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
      res.json(blog)
    }
  } catch (error) {
    next(error);
  }
});


export const disLikeTheBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
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
      res.json(blog)
    }  
  } catch (error) {
    next(error);
  }  
});  



export const uploadImages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    validateMongoDbId(_id);
    try {
      const uploader = (path: string) => cloudinaryUploadImg(path);

      const urls = [];
      const files = req.files;
      if (Array.isArray(files)) {
        for (const file of files) {
          const { path } = file;
          const newPath = await uploader(path);
          urls.push(newPath);
        }
      }
      const findBlog = await blogModel.findByIdAndUpdate(
        _id,
        {
          images: urls.map((file) => {
            return file;
          }),
        },
        {
          new: true,
        }
      );
      res.json(findBlog);
    } catch (error) {
      next(error);
    }
  }
);
