import mongoose, { InferSchemaType, model } from "mongoose";
import bcrypt  from 'bcryptjs';
import crypto from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Order, OrderModel } from './OrderModel'

const  UserModel = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        select: false
    },

    password:{
        type:String,
        required:true,
        select: false
    },
    role:{
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean, default: false
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    refreshToken: {
      type: String,
      
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
    {
      timestamps: true,
    }
);


UserModel.pre("save", async function (next) {

  if (!this.isModified('password')){
    next();
  }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plaintext password with the hashed password
    this.password = hashedPassword;
  
});

UserModel.methods.createPasswordResetToken = async function() {
  const resetTokenBuffer = Buffer.alloc(32);
  crypto.randomFillSync(resetTokenBuffer);
  const resetToken = resetTokenBuffer.toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};


type User = InferSchemaType<typeof UserModel>;

export default model<User>("User", UserModel);