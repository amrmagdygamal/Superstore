import express from 'express';
import * as EnquiryControllers from '../controllers/enquiryCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';
const EnquiryRouter = express.Router();


EnquiryRouter.post('/',  EnquiryControllers.createEnquiry)
EnquiryRouter.put('/:id', auhtMiddleware, isAdmin, EnquiryControllers.updateEnquiry)
EnquiryRouter.delete('/:id', auhtMiddleware, isAdmin, EnquiryControllers.deletEnquiry)
EnquiryRouter.get('/:d', EnquiryControllers.getEnquiry)
EnquiryRouter.get('/', EnquiryControllers.getAllEnquirys)


export default EnquiryRouter