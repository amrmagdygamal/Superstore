import mongoose from "mongoose";


export const validateMongoDbId = (_id: string) => {

  const isValid = mongoose.Types.ObjectId.isValid(_id);

  if (!isValid) throw new Error("This id is not valid or not Found")

}