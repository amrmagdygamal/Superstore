import mongoose, { Document, InferSchemaType, Model, model, Schema } from "mongoose";
import crypto from "crypto";

const userSchema = new Schema({
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

export type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
