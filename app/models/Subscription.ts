import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;

  product: "astro" | "kids" | "news" | "platform";

  startDate: Date;
  expiryDate: Date;

  status: "active" | "expired" | "cancelled" | "pending";

  paymentStatus:
    | "paid"
    | "unpaid"
    | "pending"
    | "failed";

  transactionId?: string;
  paymentGateway?: string;

  autoRenew: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    planId: {
      type: Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },

    product: {
      type: String,
      enum: ["astro", "kids", "news", "platform"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "active",
        "expired",
        "cancelled",
        "pending",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: [
        "paid",
        "unpaid",
        "pending",
        "failed",
      ],
      default: "pending",
    },

    transactionId: {
      type: String,
      default: "",
    },

    paymentGateway: {
      type: String,
      default: "",
    },

    autoRenew: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>(
    "Subscription",
    SubscriptionSchema
  );

export default Subscription;