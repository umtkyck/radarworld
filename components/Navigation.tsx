"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { Home, Store, ShoppingCart, Menu, X } from "lucide-react";
import { useState, memo } from "react";
import Logo from "./Logo";

const Navigation = memo(function Navigation() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Shop", icon: Store },
    { href: "/cart", label: "Cart", icon: ShoppingCart, badge: itemCount },
  ];

  return (
    <nav className="glass-strong sticky top-0 z-50 border-b border-radar-cyan/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="group hover:opacity-90 transition-opacity">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-2 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-radar-cyan/10 text-radar-cyan border border-radar-cyan/30"
                      : "text-radar-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span>{link.label}</span>
                  {link.badge && link.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-radar-green text-radar-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-radar-muted hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-radar-cyan/20">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? "bg-radar-cyan/10 text-radar-cyan border border-radar-cyan/30"
                        : "text-radar-muted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                    <span>{link.label}</span>
                    {link.badge && link.badge > 0 && (
                      <span className="ml-auto bg-radar-green text-radar-dark text-xs font-bold rounded-full px-2 py-0.5">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom border animation */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-radar-cyan/50 to-transparent" />
    </nav>
  );
});

export default Navigation;
