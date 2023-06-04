import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../Util/token';
import UserModel from '../model/UserModel';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import createHttpError from 'http-errors';
import { validateMongoDbId } from '../Util/validateMongodbId';
import generateRefreshToken from '../../config/refreshToken';
import jwt from 'jsonwebtoken';
import validateEnv from '../Util/validateEnv';
import { sendEmail } from './emailCtr';
import CartModel from '../model/CartModel';
import ProductModel from '../model/ProductModel';
import couponModel from '../model/couponModel';

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
      // check if user exists or not
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

// Admin login

export const AdminLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        res.json({
          msg: 'Parameters missing',
          success: false,
        });
      }
      // check if user exists or not
      const findAdmin = await UserModel.findOne({ email: email })
        .select('+password')
        .exec();

      if (!findAdmin) {
        throw createHttpError(401, 'Invalid credentials');
      }
      if (findAdmin.role !== 'admin') throw new Error('Not Authorised');

      const passwordMatch = await bcrypt.compare(password, findAdmin.password);

      if (!passwordMatch) {
        throw createHttpError(401, 'Invalid credentials');
      }
      const refreshToken = await generateRefreshToken(
        findAdmin?._id.toString()
      );

      const updateuser = await UserModel.findByIdAndUpdate(
        findAdmin?._id,
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
        _id: findAdmin?._id,
        username: findAdmin?.username,
        email: findAdmin?.email,
        token: generateToken(findAdmin?._id.toString()),
      });
    } catch (error) {
      next(error);
    }
  }
);

//handle refresh token

export const handleRefreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const cookie = req.cookies;
    // console.log(cookie)

    if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');

    const refreshToken = cookie.refreshToken;

    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      throw new Error('No Refresh Token Present in db or not mathced');
    }

    jwt.verify(
      refreshToken,
      validateEnv.JWEBT_SECRET,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err || user._id.toString() !== decoded?._id) {
          throw new Error('There is something wrong with refresh token');
        }
        const accessToken = generateToken(user._id.toString());
        res.json({ accessToken });
      }
    );
  }
);

// logout user
export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(400).json({ message: 'No Refresh Token in Cookies' });
      return;
    }

    try {
      const user = await UserModel.findOne({ refreshToken });

      if (!user) {
        res.clearCookie('refreshToken', {
          httpOnly: true,
          secure: true,
        });
        res.sendStatus(204);
        return;
      }

      await user.updateOne({ $unset: { refreshToken: '' } });

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
      });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

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

// save user address

export const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updateuser = await UserModel.findByIdAndUpdate(
      _id,
      {
        address: req.body.username,
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

// FETCHING all users

export const allUsers = asyncHandler(async (req, res, next) => {
  try {
    const getusers = await UserModel.find().select('-password');
    res.json(getusers);
  } catch (error) {
    next(error);
  }
});

// Block User
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

export const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const { password } = req.body;

  validateMongoDbId(_id);

  const user = await UserModel.findById(_id);

  if (user) {
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  }
});

export const forgotPasswordToken = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Find the user associated with the email address
  const user = await UserModel.findOne({ email });

  // Throw an error if the user is not found
  if (!user) {
    throw new Error('User not found with this email');
  }

  try {
    // Generate a password reset token for the user
    const token = await user.createPasswordResetToken();
    await user.save();

    // Construct the password reset URL and send the reset link to the user's email
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click here</a>`;
    const data = {
      to: email,
      text: 'Hey User',
      subject: 'Forgot Password Link',
      html: resetURL,
    };
    await sendEmail(data);

    // Send the password reset token back to the client
    res.json(token);
  } catch (error) {
    // Handle any errors that occur during the password reset process
    next(error);
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  // Hash the token using sha256
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find the user associated with the hashed token
  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // Throw an error if the user is not found
  if (!user) {
    throw new Error('Token Expired, Please try again later.');
  }

  // Reset the user's password and remove the reset token and expiry date
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // Save the updated user object to the database
  await user.save();

  // Send the updated user object back to the client
  res.json(user);
});

export const getWishList = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  try {
    const findUser = await UserModel.findById(userId).populate('wishlist');

    res.json(findUser);
  } catch (error) {
    next(error);
  }
});

// Add to Cart Function

export const addToCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  validateMongoDbId(_id);

  try {
    const user = await UserModel.findById(_id);

    // Find the cart for the current user
    let cart = await CartModel.findOne({ customer: user?._id });

    if (!cart) {
      cart = new CartModel({
        customer: user?._id,
        products: [],
        cartTotol: 0,
        totalAfterDiscount: 0,
      });
    }

    // Find the product to add to the cart
    const product = await ProductModel.findById(prodId);

    // Check If the product is Already in the cart

    const existProdIndex = cart.products.findIndex(
      (p) => p.product?.toString() === prodId.toString()
    );

    if (existProdIndex !== -1) {
      // the product is already exists in the cart update the quantity
      if (product?.countInStock && product.countInStock >= 1) {
        cart.products[existProdIndex].quantity += 1;
      } else {
        createHttpError('400', 'Product is out of stock');
      }
    } else {
      // add the product to the cart
      const newProduct = {
        name: product?.name ?? '',
        quantity: 1,
        image: product?.images[0] ?? '',
        price: product?.price ?? 0,
        color: product?.color,
        product: product?._id,
      };
      cart.products.push(newProduct);
    }

    // Calculate the cart total
    cart.cartTotal = cart.products.reduce(
      (prev, curr) => prev + curr.quantity * curr.price,
      0
    );

    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
});

// Delete from Cart Function
export const deleteFromCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  validateMongoDbId(_id);

  try {
    const user = await UserModel.findById(_id);

    // Find the cart for the current user
    let cart = await CartModel.findOne({ customer: user?._id });

    if (!cart) {
      cart = new CartModel({
        customer: user?._id,
        products: [],
        cartTotol: 0,
        totalAfterDiscount: 0,
      });
    }

    // Find the product to delete from the cart
    const product = await ProductModel.findById(prodId);

    // Check If the product is Already in the cart

    const existProdIndex = cart.products.findIndex(
      (p) => p.product?.toString() === prodId.toString()
    );

    if (existProdIndex !== -1) {
      // the product is already exists in the cart update the quantity

      if (cart.products[existProdIndex].quantity > 1) {
        cart.products[existProdIndex].quantity -= 1;
      } else {
        // If the quantity is 1, remove the product from the cart
        cart.products.splice(existProdIndex, 1);
      }
    } else {
      res.json("doesn't exist in the cart");
    }

    // Calculate the cart total
    cart.cartTotal = cart.products.reduce(
      (prev, curr) => prev - curr.quantity * curr.price,
      0
    );

    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
});

export const getUserCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const cart = await CartModel.findOne({ customer: _id }).populate(
      'products.product'
    );
    // Check if User already has product in cart

    res.json(cart);
  } catch (error) {
    next(error);
  }
});

export const emptyCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const user = await UserModel.findOne({ _id });
    const emptycart = await CartModel.findOneAndRemove({ customer: user?._id });
    // Check if User already has product in cart

    res.json(emptycart);
  } catch (error) {
    next(error);
  }
});

export const applyCoupon = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  validateMongoDbId(_id);

  try {
    // Check if the coupon is valid
    const validCoupon = await couponModel.findOne({ name: coupon });
    if (validCoupon === null) {
      throw new Error('Invalid Coupon');
    }

    // Get the user and the cart
    const user = await UserModel.findOne({ _id });
    const cart = await CartModel.findOne({
      customer: user?._id,
    }).populate('products.product');

    // Calculate the discounted total
    const cartTotal = cart?.cartTotal;
    const discount = cartTotal ? cartTotal * (validCoupon.discount / 100) : 0;
    const totalAfterDiscount = (cartTotal ? cartTotal - discount : 0).toFixed(
      2
    );

    // Update the cart with the discounted total
    await CartModel.findOneAndUpdate(
      { customer: user?._id },
      { totalAfterDiscount },
      { new: true }
    );

    // Send the discounted total back to the client
    res.json(totalAfterDiscount);
  } catch (error) {
    // Handle any errors that occur during the coupon application process
    next(error);
  }
});


