import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  image: { type: String },
});

export const Blog = models.Blog || model("Blog", BlogSchema);
