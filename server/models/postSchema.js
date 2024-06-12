import { Schema, model } from "mongoose";

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = model("Post", postSchema);

export default Post;
