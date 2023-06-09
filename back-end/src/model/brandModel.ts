import mongoose, { InferSchemaType, model } from "mongoose";

// Declare the Schema of the Mongo model
const  BrandModel = new mongoose.Schema(
    {
      title: {
        type: String,
        required:true,
        unique:true,
        index: true,
      },
    },
    {
      timestamps: true,
    }
    
);

//Export the model
export type Brand = InferSchemaType<typeof BrandModel>;

export default model<Brand>('Brand', BrandModel);
