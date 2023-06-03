import express from "express";
import * as BlogControllers from '../controllers/blogCtr';
import { auhtMiddleware, isAdmin } from "../middlewares/authentication";
import { blogImgResize, uploadPhoto } from "../middlewares/uploadImgs";


const blogRouter = express.Router();

blogRouter.post('/', auhtMiddleware, isAdmin, BlogControllers.createBlog);
blogRouter.put(
  '/upload/:id' ,
  auhtMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  BlogControllers.uploadImages
)
blogRouter.put('/likes', auhtMiddleware, isAdmin, BlogControllers.likeTheBlog);
blogRouter.put('/dislikes', auhtMiddleware, isAdmin, BlogControllers.disLikeTheBlog);
blogRouter.put('/:id', auhtMiddleware, isAdmin, BlogControllers.updateBlog);
blogRouter.get('/:id', BlogControllers.getBlog);
blogRouter.get('/', BlogControllers.getAllBloggs);
blogRouter.delete('/:id', auhtMiddleware, isAdmin, BlogControllers.deleteBlog);


export default blogRouter;