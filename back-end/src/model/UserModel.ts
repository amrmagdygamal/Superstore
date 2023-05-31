import mongoose, { InferSchemaType, model } from "mongoose";
import bcrypt from 'bcryptjs';
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
      
    }
  },
    {
      timestamps: true,
    }
);


UserModel.pre("save", async function (next) {

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plaintext password with the hashed password
    this.password = hashedPassword;
  
});


type User = InferSchemaType<typeof UserModel>;

export default model<User>("User", UserModel);