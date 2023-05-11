import express from "express";
import * as usersController from '../controllers/usersController'

const userRouter = express.Router()

userRouter.post('/signup', usersController.signUp);


export default userRouter;