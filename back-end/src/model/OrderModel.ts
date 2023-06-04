import mongoose, { InferSchemaType, model } from "mongoose";
import UserModel from "./UserModel";
import ProductModel from "./ProductModel";

const OrderModel = new mongoose.Schema({
  products: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    color: String,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  }],
  shippingAddress: {
    fullName: { type: String },
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
    lat: { type: Number },
    lng: { type: Number }
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  paymentMethod: { type: String, required: true },
  paymentResult: {
    paymentId: { type: String },
    status: { type: String, default: "Not Processed", enum: [
      "Not Processed", "Cash On Delivery",  "Processing", "Dispatched", "Cancelled", "Delivered"
    ] },
    update_time: { type: String },
    orderby: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  itemsPrice: { type: Number, required: true, default: 0 },
  shippingPrice: { type: Number, required: true, default: 0 },
  taxPrice: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date }
}, { timestamps: true });


type Order = InferSchemaType<typeof OrderModel>;

export default model<Order>("Order", OrderModel);