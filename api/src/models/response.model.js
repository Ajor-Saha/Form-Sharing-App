import mongoose, { Schema } from "mongoose";

const responseSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  formId: {
    type: Schema.Types.ObjectId,
    ref: 'Form'
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
    },
    value: {
        type: String, // Add value field to store the user's input
        required: true
    }
  }]
}, { timestamps: true });


export const ResponseForm = mongoose.model("ResponseForm", responseSchema);
