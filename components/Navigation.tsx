"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="glass-strong sticky top-0 z-50 border-b border-[#00F0FF]/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="text-3xl bracket-icon group-hover:scale-110 transition-transform">
              🎯
            </div>
            <span className="text-2xl font-bold font-tech text-white group-hover:text-[#00F0FF] transition-colors">
              <span className="bracket-icon">RADARWORLD</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-8 items-center">
            <Link
              href="/"
              className={`font-tech font-medium transition-colors relative group ${
                isActive('/')
                  ? 'text-[#00F0FF]'
                  : 'text-[#8B9DC3] hover:text-[#00F0FF]'
              }`}
            >
              <span className="bracket-icon">HOME</span>
              {isActive('/') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00F0FF] pulse-green" />
              )}
            </Link>

            <Link
              href="/shop"
              className={`font-tech font-medium transition-colors relative group ${
                isActive('/shop')
                  ? 'text-[#00F0FF]'
                  : 'text-[#8B9DC3] hover:text-[#00F0FF]'
              }`}
            >
              <span className="bracket-icon">SHOP</span>
              {isActive('/shop') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00F0FF] pulse-green" />
              )}
            </Link>

            <Link
              href="/cart"
              className={`font-tech font-medium transition-colors relative group ${
                isActive('/cart')
                  ? 'text-[#00F0FF]'
                  : 'text-[#8B9DC3] hover:text-[#00F0FF]'
              }`}
            >
              <span className="bracket-icon">CART</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-[#00FF41] text-[#0B1021] text-xs font-bold rounded-md w-6 h-6 flex items-center justify-center pulse-green font-tech">
                  {itemCount}
                </span>
              )}
              {isActive('/cart') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00F0FF] pulse-green" />
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom border animation */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent opacity-50" />
    </nav>
  );
}
