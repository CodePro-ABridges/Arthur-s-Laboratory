import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
  createdAt: { type: Date, default: Date.now },
});

const Comment = model("Comment", commentSchema);

export default Comment;
