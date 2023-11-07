const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A Blog Post must have a title"],
    },
    description: {
      type: String,
      required: [true, "A Blog Post must have a description"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    likes: [{ type: ObjectId, ref: "User" }],
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },

    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
