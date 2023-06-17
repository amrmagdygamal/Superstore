import express from 'express';
import * as BlogCategoriesControllers from '../controllers/blogCategCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
const blogCategRouter = express.Router();


blogCategRouter.get('/', BlogCategoriesControllers.getAllCategoies)
blogCategRouter.get('/:id', BlogCategoriesControllers.getCategory)
blogCategRouter.post('/', auhtMiddleware, isAdmin, BlogCategoriesControllers.createCategory)
blogCategRouter.put('/:id', auhtMiddleware, isAdmin, BlogCategoriesControllers.updateCategory)
blogCategRouter.delete('/:id', auhtMiddleware, isAdmin, BlogCategoriesControllers.deletCategory)


export default blogCategRouter;