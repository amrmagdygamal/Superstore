import express from 'express';
import * as CategoryControllers from '../controllers/prodcategoryCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
const categoryRouter = express.Router();


categoryRouter.post('/', auhtMiddleware, isAdmin, CategoryControllers.createCategory)
categoryRouter.put('/:id', auhtMiddleware, isAdmin, CategoryControllers.updateCategory)
categoryRouter.delete('/:id', auhtMiddleware, isAdmin, CategoryControllers.deletCategory)
categoryRouter.get('/:', CategoryControllers.getCategory)
categoryRouter.get('/', CategoryControllers.getAllCategoies)


export default categoryRouter