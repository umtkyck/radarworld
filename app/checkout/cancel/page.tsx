import Link from "next/link";
import { XCircle, ArrowRight, ShoppingCart, Headphones } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-lg text-center">
        {/* Cancel Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <XCircle size={48} className="text-red-500" />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">Checkout Cancelled</h1>
        <p className="mb-8 text-lg text-slate-500">
          Your payment was not processed. Your cart items are still saved.
        </p>

        {/* Help Notice */}
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-left">
          <div className="flex items-start gap-4">
            <Headphones size={24} className="mt-1 flex-shrink-0 text-amber-600" />
            <div>
              <h3 className="mb-2 font-semibold text-slate-900">Need Help?</h3>
              <p className="text-sm text-slate-600">
                If you experienced any issues during checkout, please contact our support team at{" "}
                <a href="mailto:support@radarcart.com" className="font-medium text-amber-700 hover:text-amber-800">
                  support@radarcart.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/cart"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-4 font-medium text-white transition-colors hover:bg-slate-800"
          >
            <ShoppingCart size={20} />
            Return to Cart
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-8 py-4 font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
