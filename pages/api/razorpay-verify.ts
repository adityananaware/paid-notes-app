import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { dbConnect } from "../../lib/db";
import Order from "../../models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart, userEmail } = req.body;
  // Signature verification
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest("hex");
  if (generated_signature === razorpay_signature) {
    await dbConnect();
    await Order.create({
      userEmail,
      noteIds: cart.map((n: any) => n._id),
      paid: true,
      razorpay_order_id,
      razorpay_payment_id,
    });
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false, error: "Invalid signature" });
  }
}