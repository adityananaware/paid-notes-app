import { getSession } from "next-auth/react";
import { dbConnect } from "../../lib/db";
import Order from "../../models/Order";
import Note from "../../models/Note";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end("Unauthorized");

  const { noteId } = req.query;
  await dbConnect();

  const order = await Order.findOne({
    userEmail: session.user.email,
    noteIds: noteId,
    paid: true,
  });
  if (!order) return res.status(403).end("No access");

  const note = await Note.findById(noteId);
  // Send file or redirect to download URL
  res.redirect(note.fileUrl);
}