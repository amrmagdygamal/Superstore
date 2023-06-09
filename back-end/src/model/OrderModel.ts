import mongoose, { InferSchemaType, model } from 'mongoose';
import ProductModel from './ProductModel';

const OrderModel = new mongoose.Schema(
  {
    products: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        color: [{type: mongoose.Schema.Types.ObjectId, ref: "Color"}],
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      },
    ],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      country: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: Number, required: true },
      lat: { type: Number },
      lng: { type: Number },
    },
    orderby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    month: {
      type: String,
      default: new Date().getMonth()
    },
    paymentResult: {
      PaymentMethod: {type: String, required: true},
      paymentId: { type: String },
      amount: {type: Number, required: true,default: 0},
      shippingPrice: { type: Number, required: true, default: 0 },
      taxPrice: { type: Number, required: true, default: 0 },           
      totalPriceAfterDiscount: {type: Number, required: true,default: 0},
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

    paidAt: Date,
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

type Order = InferSchemaType<typeof OrderModel>;

export default model<Order>('Order', OrderModel);

