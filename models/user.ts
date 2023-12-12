import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "EMail already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  image: { type: String },
});

export const User = models.User || model("User", UserSchema);
