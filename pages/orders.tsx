import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Order = { notes: { title: string, fileUrl: string }[] };

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (session) {
      fetch("/api/orders").then(r => r.json()).then(setOrders);
    }
  }, [session]);
  if (!session) return <p>Login to view your notes.</p>;
  return (
    <div>
      <h1>Your Purchased Notes</h1>
      <ul>
        {orders.map((order, i) => (
          <li key={i}>
            {order.notes.map(note => (
              <div key={note.title}>
                <span>{note.title}</span>
                <a href={note.fileUrl} download>Download</a>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}