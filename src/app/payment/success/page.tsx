"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      if (!sessionId) return;

      try {
        const res = await fetch(
          `http://localhost:5000/get-checkout-session?session_id=${sessionId}`
        ); 
        const data = await res.json();
        setOrderData(data);
      } catch (err) {
        console.error("Failed to fetch session:", err);
      }
    };

    fetchSession();
  }, []);

  if (!orderData) return <p>Loading order details...</p>;

  const products = orderData.metadata?.items
    ? JSON.parse(orderData.metadata.items)
    : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700">
        ✅ Payment Successful!
      </h1>

      <p className="mt-4 font-medium">
        Order ID: {orderData.metadata?.order_id}
      </p>
      <p>User ID: {orderData.metadata?.user_id}</p>
      <p>Amount Paid: ₹{orderData.amount_total / 100}</p>

      <h2 className="mt-6 text-lg font-semibold">Purchased Items:</h2>
      <ul className="list-disc list-inside">
        {products.map((item: any, index: number) => (
          <li key={index}>
            {item.price_data.product_data.name} × {item.quantity}
            <span className="ml-2 text-sm text-gray-500">
              (₹{(item.price_data.unit_amount * item.quantity) / 100})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
