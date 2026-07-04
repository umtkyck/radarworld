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
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Cart & User */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <ShoppingCart size={18} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center bg-emerald-500 px-1 font-mono text-[10px] font-medium text-black">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 transition-colors"
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
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <User size={18} className="text-emerald-400" />
                    </div>
                  )}
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-[#050505] border border-white/10 shadow-lg z-50 overflow-hidden">
                      <div className="p-4 border-b border-white/10">
                        <p className="text-white font-semibold truncate">{session.user?.name}</p>
                        <p className="text-zinc-500 text-sm truncate">{session.user?.email}</p>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => signOut()}
                          className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
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
                className="hidden md:flex items-center gap-2 border border-white/15 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:border-white/40"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-2 py-3 text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!session && (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-3 text-base font-medium text-emerald-400 transition-colors flex items-center gap-2"
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
  );
}
