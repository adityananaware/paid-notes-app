import { useCart } from "../context/CartContext";
// import RazorpayButton from "../components/RazorpayButton"; // Uncomment when Razorpay is ready

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, n) => sum + n.price, 0);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map(note => (
            <li key={note._id} className="border-b py-2 flex justify-between">
              <div>
                <div className="font-semibold">{note.title}</div>
                <div className="text-sm">₹{note.price}</div>
              </div>
              <button className="text-red-600" onClick={() => removeFromCart(note._id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 font-bold">Total: ₹{total}</div>
      <div className="mt-4">
        {/* Place Razorpay button here */}
        {/* <RazorpayButton amount={total} cart={cart} userEmail="test@example.com" onSuccess={clearCart} /> */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" disabled>
          Pay with Razorpay (Coming Soon)
        </button>
      </div>
    </div>
  );
}