import mongoose, { Document, InferSchemaType, Model, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

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
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
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
export const UserModel = mongoose.model('User', userSchema);
