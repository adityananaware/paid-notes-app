import { useCart } from "../context/CartContext";

const NOTES = [
  { _id: "1", title: "Calculus Notes", description: "Detailed calculus notes", price: 150 },
  { _id: "2", title: "Physics Formulas", description: "All important formulas", price: 100 },
  { _id: "3", title: "Organic Chemistry", description: "Quick revision guide", price: 120 },
];

export default function Home() {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Paid Notes</h1>
      <ul>
        {NOTES.map(note => (
          <li key={note._id} className="border p-3 mb-3 rounded">
            <h2 className="font-semibold">{note.title}</h2>
            <p>{note.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold">₹{note.price}</span>
              {cart.find(n => n._id === note._id) ? (
                <button
                  className="text-red-600"
                  onClick={() => removeFromCart(note._id)}
                >Remove from Cart</button>
              ) : (
                <button
                  className="text-blue-600"
                  onClick={() => addToCart(note)}
                >Add to Cart</button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <a href="/cart" className="block mt-6 text-center bg-green-600 text-white p-3 rounded">
        Go to Cart ({cart.length})
      </a>
    </div>
  );
}