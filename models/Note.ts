import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  fileUrl: String, // S3 or local file path
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);