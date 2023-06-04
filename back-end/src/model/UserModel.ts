import mongoose, { Document, Model, model, Schema } from "mongoose";
import crypto from "crypto";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  isBlocked: boolean;
  cart: Array;
  address: string;
  wishlist: mongoose.Schema.Types.ObjectId[];
  refreshToken?: string;
  orders: mongoose.Schema.Types.ObjectId[];
  passwordChangedAt?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createPasswordResetToken: () => Promise<string>;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

userSchema.methods.createPasswordResetToken = async function () {
  const resetTokenBuffer = Buffer.alloc(32);
  crypto.randomFillSync(resetTokenBuffer);
  const resetToken = resetTokenBuffer.toString("hex");
  
  this.passwordResetToken = crypto
  .createHash("sha256")
  .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

const UserModel: Model<User> = model<User>("User", userSchema);

export default UserModel;