import mongoose, { InferSchemaType, Schema, model } from 'mongoose';
import { User } from './UserModel';
import { Color } from './ColorModel';

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    brand: {
      type: String,
      required: true,
    },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    numReviews: { type: Number, default: 0 },
    color: [{type: mongoose.Schema.Types.ObjectId, ref: "Color"}],
    tags: String,
  },
  {
    timestamps: true,
  }
);

export type Product = InferSchemaType<typeof productSchema>;

export default model<Product>('Product', productSchema);
