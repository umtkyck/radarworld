import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-2xl text-center">
        <div className="text-6xl mb-6">❌</div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Checkout Cancelled</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your payment was not processed. Your cart items are still saved.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-yellow-800">
            If you experienced any issues during checkout, please contact our support team.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/cart"
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Return to Cart
          </Link>
          <Link
            href="/shop"
            className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
