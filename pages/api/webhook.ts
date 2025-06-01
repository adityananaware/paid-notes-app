import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { dbConnect } from '../../lib/db';
import Order from '../../models/Order';
// import your User and Note models if needed

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2022-11-15" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const sig = req.headers['stripe-signature'] as string;
  const buf = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await dbConnect();
    // Example: session.metadata.userId and session.metadata.noteIds (set these when creating the session!)
    const userEmail = session.customer_email;
    const noteIds = session.metadata?.noteIds?.split(",") ?? [];
    // Save the purchase (this is simplified, adjust for your models)
    await Order.create({
      userEmail,
      noteIds,
      paid: true,
      sessionId: session.id,
    });
    // Optionally, update user model to grant access
  }

  res.status(200).json({ received: true });
}