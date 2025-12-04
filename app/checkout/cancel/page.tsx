import Link from "next/link";
import { XCircle, ArrowRight, ShoppingCart, Headphones } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Cancel Icon */}
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <XCircle size={48} className="text-red-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">Checkout Cancelled</h1>
        <p className="text-zinc-400 text-lg mb-8">
          Your payment was not processed. Your cart items are still saved.
        </p>

        {/* Help Notice */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8 text-left">
          <div className="flex items-start gap-4">
            <Headphones size={24} className="text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-white mb-2">Need Help?</h3>
              <p className="text-zinc-400 text-sm">
                If you experienced any issues during checkout, please contact our support team at{" "}
                <a href="mailto:support@radarcart.com" className="text-amber-400 hover:text-amber-300">
                  support@radarcart.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cart"
            className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors inline-flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Return to Cart
          </Link>
          <Link
            href="/shop"
            className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
