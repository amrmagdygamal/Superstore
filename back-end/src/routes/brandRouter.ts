import express from 'express';
import * as BrandControllers from '../controllers/brandCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
const brandRouter = express.Router();

brandRouter.get('/', BrandControllers.getAllBrands);

// Get a specific brand

// Create a new brand (requires authentication and admin privileges)
brandRouter.get('/:id', auhtMiddleware, isAdmin, BrandControllers.getBrand);
brandRouter.post('/', auhtMiddleware, isAdmin, BrandControllers.createBrand);

// Update an existing brand (requires authentication and admin privileges)
brandRouter.put('/:id', auhtMiddleware, isAdmin, BrandControllers.updateBrand);

// Delete a brand (requires authentication and admin privileges)
brandRouter.delete(
  '/:id',
  auhtMiddleware,
  isAdmin,
  BrandControllers.deletBrand
);

export default brandRouter;
