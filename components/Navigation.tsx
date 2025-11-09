"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navigation() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            🎯 RadarWorld
          </Link>

          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-900 font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-blue-900 font-medium">
              Shop
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-900 font-medium relative">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
