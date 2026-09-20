import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    careerId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true, // in INR, e.g. 99 for ₹99
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
      index: true,
    },
    receipt: {
      type: String,
    },
    cfOrderId: {
      type: String,
      index: true,
    },
    cfPaymentId: {
      type: String,
      index: true,
    },
    cfSignature: {
      type: String,
    },
    paymentSessionId: {
      type: String,
    },
    notes: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
export default Order;
