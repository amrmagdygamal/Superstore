
import mongoose, { InferSchemaType, model } from 'mongoose';
import { Product } from './ProductModel';
import { User } from './UserModel';
import { Color } from './ColorModel';

const CartModel = new mongoose.Schema(
  {
    products: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        color: {type: mongoose.Schema.Types.ObjectId, ref: "Color"},
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
  },
  {
    timestamps: true,
  }
);

type Cart = InferSchemaType<typeof CartModel>;

export default model<Cart>('Cart', CartModel);
