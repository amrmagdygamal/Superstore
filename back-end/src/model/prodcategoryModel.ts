import mongoose, { InferSchemaType, model } from "mongoose";

// Declare the Schema of the Mongo model
const  ProdCategorySchema = new mongoose.Schema(
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
export type ProdCategory = InferSchemaType<typeof ProdCategorySchema>;

export default model<ProdCategory>('ProdCategory', ProdCategorySchema);
