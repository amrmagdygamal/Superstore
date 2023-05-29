import mongoose, { InferSchemaType, model } from "mongoose";

const  UserModel = new mongoose.Schema({

    _id: {type: String},

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
});

type User = InferSchemaType<typeof UserModel>;

export default model<User>("User", UserModel);