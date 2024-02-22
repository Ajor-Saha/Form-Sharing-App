import mongoose, { Schema } from "mongoose";

const FormSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fields: [{
    type: {
      type: String,
      enum: ['text'],
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });


export const Form = mongoose.model("Form", FormSchema);
