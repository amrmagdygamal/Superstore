import { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema({

  _id: { type: String },
  name: { type: String, required: true},
  slug: { type: String, required: true, unique: true},
  image: { type: String, required: true},
  brand: { type: String, required: true},
  category: { type: String, required: true},
  description: { type: String, required: true},
  price: { type: Number, required: true, default: 0},
  countInStock: { type: Number, required: true, default: 0},
  rating: { type: Number, required: true, default: 0},
  numReviews: { type: Number, required: true, default: 0}
  
}, {

  timestamps: true,

});

export type Product = InferSchemaType<typeof productSchema>;


export default model<Product>("Product", productSchema);

