import mongoose, { InferSchemaType, model } from "mongoose";


// Declare the Schema of the Mongo model
const EnquiryModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    status: {
      type: String,
      default: "Submitted",
      enum: ["Submitted", "Contacted", "In Progress", "Resolved "],
    }
});

//Export the model
export type Enquiry = InferSchemaType<typeof EnquiryModel>;

export default model<Enquiry>('Enquiry', EnquiryModel);
