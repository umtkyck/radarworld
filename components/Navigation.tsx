"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";
import Image from "next/image";

export default function Navigation() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement banner */}
      {bannerVisible && (
        <div className="relative bg-slate-900 px-10 py-2 text-center text-xs font-medium text-white sm:text-sm">
          Free North America shipping on orders over $1,000{" "}
          <Link href="/shop" className="ml-1 underline underline-offset-2 hover:text-emerald-300">
            Shop Now
          </Link>
          <button
            onClick={() => setBannerVisible(false)}
            aria-label="Close banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Logo size="sm" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side - Cart & User */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-slate-500 transition-colors hover:text-slate-900"
              >
                <ShoppingCart size={20} strokeWidth={1.75} />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-slate-900 px-1 text-[11px] font-semibold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-slate-100"
                  >
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                        <User size={18} className="text-slate-600" />
                      </div>
                    )}
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                        <div className="border-b border-slate-100 p-4">
                          <p className="truncate font-semibold text-slate-900">{session.user?.name}</p>
                          <p className="truncate text-sm text-slate-500">{session.user?.email}</p>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => signOut()}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                          >
                            <LogOut size={18} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 md:block"
                >
                  Sign In
                </Link>
              )}

              {/* Primary CTA */}
              <Link
                href="/contact"
                className="hidden rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 md:block"
              >
                Get Quote
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-500 transition-colors hover:text-slate-900 md:hidden"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="border-t border-slate-200 py-4 md:hidden">
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-2 py-3 text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {!session && (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-2 py-3 text-base font-medium text-slate-900 transition-colors"
                  >
                    <User size={18} />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
