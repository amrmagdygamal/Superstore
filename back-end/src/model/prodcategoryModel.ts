import mongoose, { InferSchemaType, model } from "mongoose";

// Declare the Schema of the Mongo model
const  CategorySchema = new mongoose.Schema(
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
export type Category = InferSchemaType<typeof CategorySchema>;

export default model<Category>('Category', CategorySchema);
