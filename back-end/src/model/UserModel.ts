import { Document, Model, model, Schema } from "mongoose";
import crypto from "crypto";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  isBlocked: boolean;
  orders: Schema.Types.ObjectId[];
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  refreshToken?: string;
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
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  passwordResetToken: String,
  passwordResetExpires: Date,
  refreshToken: String,
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