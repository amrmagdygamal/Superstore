import mongoose, { InferSchemaType, model } from "mongoose";

// Declare the Schema of the Mongo model
const  BlogCategorySchema = new mongoose.Schema(
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
export type BlogCategory = InferSchemaType<typeof BlogCategorySchema>;

export default model<BlogCategory>('BlogCategory', BlogCategorySchema);
