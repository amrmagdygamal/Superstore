import mongoose, { InferSchemaType, model } from "mongoose";

// Declare the Schema of the Mongo model
const CouponModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
    },
    expiry:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
});



//Export the model

export type Coupon = InferSchemaType<typeof CouponModel>;


export default model<Coupon>("Coupon", CouponModel);

