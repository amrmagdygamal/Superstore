import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true, trim: true},
  slug: { type: String, required: true, unique: true},
  images: { type: Array, required: true},
  brand: {
    type: String, enum: ['Apple', "Samsung", "Lenovo"],
  },
  category: { type: mongoose.Schema.Types.ObjectId,ref: "Category", required: true},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  countInStock: { type: Number, required: true},
  rating: [
    {
      star: Number,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }
  ],
  sold: {
    type: Number, default: 0
  },
  numReviews: { type: Number, required: true, default: 0},
  color: {
    type: String, enum: ['Black', "Brown", "Red"]
  }
  
}, {

  timestamps: true,

});

export type Product = InferSchemaType<typeof productSchema>;


export default model<Product>("Product", productSchema);

