import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../lib/db";
import Note from "../../models/Note";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === "GET") {
    const notes = await Note.find({});
    res.json(notes);
  } else if (req.method === "POST") {
    // Add authentication and admin check here!
    const { title, description, price, fileUrl } = req.body;
    const note = await Note.create({ title, description, price, fileUrl });
    res.status(201).json(note);
  }
}