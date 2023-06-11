import express from 'express';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
import * as UploadControllers from '../controllers/uploadCtr'
import { productImgResize, uploadPhoto } from '../middlewares/uploadImgs';

const uploadRouter = express.Router();



uploadRouter.post(
  '/' ,
  auhtMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  UploadControllers.uploadImages
)

;

uploadRouter.delete(
  '/delete-img/:id',
  auhtMiddleware,
  isAdmin,
  UploadControllers.deleteImages
);



export default uploadRouter;
