import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true, select: false},
  password: { type: String, required: true, select: false},
});

export type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);