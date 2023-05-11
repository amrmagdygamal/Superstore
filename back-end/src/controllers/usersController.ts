import createHttpError from 'http-errors'
import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import UserModel from '../model/UserModel';
import { generateToken } from '../Util/token';


interface SignUpBody {
  username?: string,
  email?: string,
  password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  const { username, email, password: passwordRaw } = req.body;

  try {
    if(!username || !email || !passwordRaw) {
      throw createHttpError(400, 'Parameters missing');
    }

    const existingUsername = await UserModel.findOne({ username: username}).exec();

    if (existingUsername) {
      throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
    }
    const existingEmail = await UserModel.findOne({ email: email}).exec();

    if(existingEmail) {
      throw createHttpError(409, "A user with this email already exists. Please log in instead.");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error)
  }
}


interface LoginBody {
  email?: string,
  password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if( !email || !password) {
      throw createHttpError(400, 'Parameters missing');
    }

    const user = await UserModel.findOne({ email: email }).select('+password + email').exec();

    if(!user) {
      throw createHttpError(401, 'Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) {
      throw createHttpError(401, 'Invalid username or password');
    }

    if(user) {
      if (bcrypt.compareSync(password!, user.password)) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user)
        })
      }
    }

    // res.status(201).json(User);
  } catch (error) {
    next(error)
  }
}


