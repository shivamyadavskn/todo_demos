"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51Rmi4yCzizGBGc9LKMGavXs91adeI7P8kbLAAdXjpOtnJYHYvvP3ROI1qSlh8nJ1DBZ21LMtZEp3vxk1CuTD6MRd00mlGsn2ff"
);

export default function StripeButton() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch("http://localhost:5000/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Product 1",
            },
            unit_amount: 10000, // ₹50.00 in paise
          },
          quantity: 2,
        },
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Product 2",
            },
            unit_amount: 5000, // ₹50.00 in paise
          },
          quantity: 4,
        },
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Product client sent product 3",
            },
            unit_amount: 5000, // ₹50.00 in paise
          },
          quantity: 4,
        },
      ]),
    });

    const data = await res.json();
    debugger;
    if (data?.id) {
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      debugger;
      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error("Session creation failed", data);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
    >
      Pay with Stripe
    </button>
  );
}
