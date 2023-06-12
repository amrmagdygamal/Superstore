import mongoose, { InferSchemaType, model } from 'mongoose';
import UserModel from './UserModel';
import ProductModel from './ProductModel';

const OrderModel = new mongoose.Schema(
  {
    products: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        color: String,
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      },
    ],
    shippingAddress: {
      fullName: { type: String },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
      lat: { type: Number },
      lng: { type: Number },
    },
    orderby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    paymentResult: {
      paymentId: { type: String },
      status: {
        type: String,
        default: 'Not Processed',
        enum: [
          'Not Processed',
          'Cash On Delivery',
          'Processing',
          'Dispatched',
          'Cancelled',
          'Delivered',
        ],
      },
    },
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    paidAt: Date,
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

type Order = InferSchemaType<typeof OrderModel>;

export default model<Order>('Order', OrderModel);

