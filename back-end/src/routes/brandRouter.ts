import express from 'express';
import * as BrandControllers from '../controllers/brandCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
const brandRouter = express.Router();


brandRouter.put('/:id', auhtMiddleware, isAdmin, BrandControllers.updateBrand)
brandRouter.post('/', auhtMiddleware, isAdmin, BrandControllers.createBrand)
brandRouter.delete('/:id', auhtMiddleware, isAdmin, BrandControllers.deletBrand)
brandRouter.get('/:', BrandControllers.getBrand)
brandRouter.get('/', BrandControllers.getAllBrands)


export default brandRouter