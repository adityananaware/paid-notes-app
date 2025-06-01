import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  noteIds: [String],
  paid: { type: Boolean, default: false },
  razorpay_order_id: String,
  razorpay_payment_id: String,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);