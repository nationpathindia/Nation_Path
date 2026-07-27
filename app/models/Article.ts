import mongoose from "mongoose";
import { getModel } from "@/lib/mongoose-model";
const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    views: {
      type: Number,
      default: 0,
    },

    isBreaking: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "draft",
    },

    videoUrl: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);


export default getModel(
  "Article",
  ArticleSchema
);