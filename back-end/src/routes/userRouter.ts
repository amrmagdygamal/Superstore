import express from 'express';
import * as UserControllers from '../controllers/UserCtr'

export const userRouter = express.Router();

userRouter.post('/signup', UserControllers.signup);
userRouter.post('/login', UserControllers.login);
userRouter.get('/all-users', UserControllers.allUsers);
userRouter.get('/:id', UserControllers.getuser);
userRouter.delete('/:id', UserControllers.deleteUser);
userRouter.put('/:id', UserControllers.updateUser
)