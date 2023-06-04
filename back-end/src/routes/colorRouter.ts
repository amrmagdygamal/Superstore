import express from 'express';
import * as ColorControllers from '../controllers/colorCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
const colorRouter = express.Router();


colorRouter.post('/', auhtMiddleware, isAdmin, ColorControllers.createColor)
colorRouter.put('/:id', auhtMiddleware, isAdmin, ColorControllers.updateColor)
colorRouter.delete('/:id', auhtMiddleware, isAdmin, ColorControllers.deletColor)
colorRouter.get('/:', ColorControllers.getColor)
colorRouter.get('/', ColorControllers.getAllColors)


export default colorRouter