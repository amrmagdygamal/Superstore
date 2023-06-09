import express from 'express';
import * as BlogControllers from '../controllers/blogCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
import { blogImgResize, uploadPhoto } from '../middlewares/uploadImgs';
import { deleteImages, uploadImages } from '../controllers/uploadCtr';

const blogRouter = express.Router();

blogRouter.post(
  '/upload/',
  auhtMiddleware,
  isAdmin,
  uploadPhoto.array('images', 2),
  blogImgResize,
  uploadImages
);
blogRouter.post('/', auhtMiddleware, isAdmin, BlogControllers.createBlog);
blogRouter.put('/likes', auhtMiddleware, BlogControllers.likeTheBlog);
blogRouter.put('/dislikes', auhtMiddleware, BlogControllers.disLikeTheBlog);
blogRouter.put('/:id', auhtMiddleware, isAdmin, BlogControllers.updateBlog);
blogRouter.get('/:id', BlogControllers.getBlog);
blogRouter.get('/', BlogControllers.getAllBloggs);
blogRouter.delete('/:id', auhtMiddleware, isAdmin, BlogControllers.deleteBlog);

blogRouter.delete(
  '/delete-img/images/:id',
  auhtMiddleware,
  isAdmin,
  deleteImages
);


export default blogRouter;
