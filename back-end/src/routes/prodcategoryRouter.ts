import express from 'express';
import * as CategoryControllers from '../controllers/prodcategoryCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
const prodCategRouter = express.Router();

prodCategRouter.get('/', CategoryControllers.getAllCategoies);

prodCategRouter.get('/:id',auhtMiddleware, isAdmin, CategoryControllers.getCategory);
prodCategRouter.post(
  '/',
  auhtMiddleware,
  isAdmin,
  CategoryControllers.createCategory
);
prodCategRouter.put(
  '/:id',
  auhtMiddleware,
  isAdmin,
  CategoryControllers.updateCategory
);
prodCategRouter.delete(
  '/:id',
  auhtMiddleware,
  isAdmin,
  CategoryControllers.deletCategory
);

export default prodCategRouter;
