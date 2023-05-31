import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../Util/token';
import UserModel from '../model/UserModel';
import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import { validateMongoDbId } from '../Util/validateMongodbId';
import generateRefreshToken from '../../config/refreshToken';
import jwt from 'jsonwebtoken';
import validateEnv from '../Util/validateEnv';

// register a user
export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) {
        res.json({
          msg: 'Parameters missing',
          success: false,
        });
      }
      const findUsername = await UserModel.findOne({
        username: username,
      }).exec();

      if (findUsername) {
        res.json({
          msg: 'Username already taken. Please choose a different one or log in instead.',
          success: false,
        });
      }

      const findEmail = await UserModel.findOne({ email: email }).exec();

      if (findEmail) {
        res.json({
          msg: 'Email already taken. Please choose a different one or log in instead.',
          success: false,
        });
      }

      const newuser = await UserModel.create(req.body);
      res.json(newuser);
    } catch (error) {
      next(error);
    }
  }
);

// login a user
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        res.json({
          msg: 'Parameters missing',
          success: false,
        });
      }

      const finduser = await UserModel.findOne({ email: email })
        .select('+password')
        .exec();

      if (!finduser) {
        throw createHttpError(401, 'Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(password, finduser.password);

      if (!passwordMatch) {
        throw createHttpError(401, 'Invalid credentials');
      }
      const refreshToken = await generateRefreshToken(finduser?._id.toString());

      const updateuser = await UserModel.findByIdAndUpdate(
        finduser?._id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        _id: finduser?._id,
        username: finduser?.username,
        email: finduser?.email,
        token: generateToken(finduser?._id.toString()),
      });
    } catch (error) {
      next(error);
    }
  }
);

//handle refresh token


export const handleRefreshToken = asyncHandler(async (req: Request, res: Response) => {
  const cookie = req.cookies;
  // console.log(cookie)

  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");

  const refreshToken = cookie.refreshToken;

  const user = await UserModel.findOne({ refreshToken });

  if (!user) {
    throw new Error("No Refresh Token Present in db or not mathced");
  }

  jwt.verify(refreshToken, validateEnv.JWEBT_SECRET, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err || user._id.toString() !== decoded?._id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user._id.toString());
    res.json({ accessToken });
  });
});



// logout user 
export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(400).json({ message: 'No Refresh Token in Cookies' });
    return
  }

  const user = await UserModel.findOne({ refreshToken });

  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204);
    return
  }

  await user.updateOne({ $unset: { refreshToken: '' } });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});


// FETCHING all users

export const allUsers = asyncHandler(async (req, res, next) => {
  try {
    const getusers = await UserModel.find().select('-password');
    res.json(getusers);
  } catch (error) {
    next(error);
  }
});

// fetching specific user
export const getuser = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);

  try {
    const getuser = await UserModel.findById(_id).select('-password');
    res.json(getuser);
  } catch (error) {
    next(error);
  }
});

// deleting specific user
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);

  try {
    const deleteuser = await UserModel.findByIdAndDelete(_id);

    res.json(deleteuser);
  } catch (error) {
    next(error);
  }
});

// updating  user
export const updateUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateuser = await UserModel.findByIdAndUpdate(
      _id,
      {
        username: req.body.username,
        email: req.body.firstname,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updateuser);
  } catch (error) {
    next(error);
  }
});

export const blockUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);

  try {
    const blockuser = await UserModel.findByIdAndUpdate(
      _id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );

    res.json({
      message: 'User Blocked',
    });
  } catch (error) {
    next(error);
  }
});

export const unBlockUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;
  validateMongoDbId(_id);

  try {
    const unblocked = await UserModel.findByIdAndUpdate(
      _id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );

    res.json({
      message: 'User UnBlocked',
    });
  } catch (error) {
    next(error);
  }
});
