"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful purchase
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-2xl text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-2">What's Next?</h2>
          <ul className="text-left text-blue-800 space-y-2">
            <li>✓ You'll receive an order confirmation email shortly</li>
            <li>✓ We'll send shipping updates as your order progresses</li>
            <li>✓ Our team will contact you for installation coordination</li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/shop"
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
