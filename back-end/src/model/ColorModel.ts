import mongoose, { InferSchemaType, model } from "mongoose";

// Declare the Schema of the Mongo model
const  ColorModel = new mongoose.Schema(
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
export type Color = InferSchemaType<typeof ColorModel>;

export default model<Color>('Color', ColorModel);
