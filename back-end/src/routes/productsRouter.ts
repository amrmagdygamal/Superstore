import express from 'express';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
import * as ProductControllers from '../controllers/productCtr'

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






export default productRouter;
