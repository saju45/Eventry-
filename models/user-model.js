import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    name: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    phone: {
        type: String, required: true
    },
    bio: {
      required: true,
      type: String
    }
  });


export const userModel = mongoose.models.users ?? mongoose.model("users", schema);
