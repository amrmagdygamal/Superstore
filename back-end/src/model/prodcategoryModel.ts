import mongoose, { InferSchemaType, model } from "mongoose";

// Declare the Schema of the Mongo model
const  ProdCategoryModel = new mongoose.Schema(
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
export type ProdCategory = InferSchemaType<typeof ProdCategoryModel>;

export default model<ProdCategory>('ProdCategory', ProdCategoryModel);
