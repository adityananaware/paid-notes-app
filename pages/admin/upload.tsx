import { useState } from "react";

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState<File>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    // Handle response
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Price" required />
      <input type="file" onChange={e => setFile(e.target.files?.[0])} required />
      <button type="submit">Upload Note</button>
    </form>
  );
}