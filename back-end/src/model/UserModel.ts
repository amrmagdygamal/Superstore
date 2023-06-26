import { Request, Response, NextFunction } from 'express';
import mongoose, { Document, InferSchemaType, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Define the User schema
const userSchema = new Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(),},
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    select: false
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Array,
    default: [],
  },
  address: { type: String},
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  refreshToken: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// Define the User model
export interface UserDocument extends Document {
  createPasswordResetToken(): string;
  // other custom methods or properties can be defined here
}


export type User = InferSchemaType<typeof userSchema>;
export const UserModel: any= model<UserDocument>('User', userSchema);

// Define the createPasswordResetToken method on the User schema
userSchema.methods.createPasswordResetToken = function () {
  const resetTokenBuffer = Buffer.alloc(32);
  crypto.randomFillSync(resetTokenBuffer);
  const resetToken = resetTokenBuffer.toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);

  return resetToken;
};

