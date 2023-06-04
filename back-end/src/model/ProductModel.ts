import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, trim: true},
  slug: { type: String, required: true, unique: true},
  images: [],
  brand: {
    type: String, required: true,
  },
  category: { type: String,  required: true},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  countInStock: { type: Number, required: true},
  ratings: [
    {
      star: Number,
      comment: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }
  ],
  totalrating: {
    type: String,
    default: 0,
  },
  sold: {
    type: Number, default: 0, select: false
  },
  numReviews: { type: Number, default: 0},
  color: {
    type: String, required: true
  }
  
}, {

  timestamps: true,

});

export type Product = InferSchemaType<typeof productSchema>;


export default model<Product>("Product", productSchema);

