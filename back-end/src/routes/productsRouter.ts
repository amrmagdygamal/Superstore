import express from 'express';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
import * as ProductControllers from '../controllers/productCtr'
import { productImgResize, uploadPhoto } from '../middlewares/uploadImgs';

const productRouter = express.Router();

productRouter.post(
  '/',
  auhtMiddleware,
  isAdmin,
  ProductControllers.createProduct
);

productRouter.put(
  '/upload/:id' ,
  auhtMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  ProductControllers.uploadImages
)

productRouter.put(
  '/:id',
  auhtMiddleware,
  isAdmin,
  ProductControllers.updateProduct
);

productRouter.put(
  '/wishlist', auhtMiddleware, ProductControllers.addToWishList
);

productRouter.put(
  '/rating', auhtMiddleware, ProductControllers.rating
);


productRouter.delete(
  '/:id',
  auhtMiddleware,
  isAdmin,
  ProductControllers.deleteProduct
  );

productRouter.get(
  '/:id',
  ProductControllers.getProduct
);

productRouter.get(
  '/',
  ProductControllers.getAllProducts
);



export default productRouter;
