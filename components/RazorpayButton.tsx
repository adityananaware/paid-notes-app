import React from "react";

export default function RazorpayButton({ amount, cart, userEmail, onSuccess }) {
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    await loadRazorpay();
    const receipt = `rcpt_${Date.now()}`;
    const res = await fetch("/api/razorpay-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, receipt }),
    });
    const data = await res.json();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Paid Notes",
      description: "Buy Notes",
      order_id: data.id,
      handler: async function (response) {
        // verify payment on backend
        const verifyRes = await fetch("/api/razorpay-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            cart,
            userEmail,
            orderId: data.id,
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          onSuccess?.();
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: { email: userEmail },
      theme: { color: "#3399cc" },
    };
    //@ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handlePayment}>
      Pay with Razorpay
    </button>
  );
}