import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartCheckoutButton({ cart, email }) {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, email }),
    });
    const { url } = await res.json();
    window.location = url; // Redirect to Stripe Checkout
  };

  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCheckout}>
      Checkout
    </button>
  );
}