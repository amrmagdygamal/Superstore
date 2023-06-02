import express from 'express';
import * as CategoryControllers from '../controllers/prodcategoryCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
const blogCategRouter = express.Router();


blogCategRouter.post('/', auhtMiddleware, isAdmin, CategoryControllers.createCategory)
blogCategRouter.put('/:id', auhtMiddleware, isAdmin, CategoryControllers.updateCategory)
blogCategRouter.delete('/:id', auhtMiddleware, isAdmin, CategoryControllers.deletCategory)
blogCategRouter.get('/:', CategoryControllers.getCategory)
blogCategRouter.get('/', CategoryControllers.getAllCategoies)


export default blogCategRouter;