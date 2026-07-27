import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeature extends Document {
  name: string;
  slug: string;
  product: "astro" | "kids" | "news" | "platform";
  description?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const FeatureSchema = new Schema<IFeature>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    product: {
      type: String,
      enum: ["astro", "kids", "news", "platform"],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Feature: Model<IFeature> =
  mongoose.models.Feature ||
  mongoose.model<IFeature>("Feature", FeatureSchema);

export default Feature;