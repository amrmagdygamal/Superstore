import express from 'express';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
import * as ProductControllers from '../controllers/productCtr'
import { productImgResize, uploadPhoto } from '../middlewares/uploadImgs';
import { deleteImages, uploadImages } from '../controllers/uploadCtr';

const productRouter = express.Router();

productRouter.get(
  '/',
  ProductControllers.getAllProducts
  );
  productRouter.get(
    '/:id',
    ProductControllers.getProduct
  );

  productRouter.post(
    '/upload' ,
    auhtMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadImages
  )
  
  
  
productRouter.post(
  '/',
  auhtMiddleware,
  isAdmin,
  ProductControllers.createProduct
);


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

  productRouter.delete(
    '/delete-img/images/:id',
    auhtMiddleware,
    isAdmin,
    deleteImages
  );
  





export default productRouter;
