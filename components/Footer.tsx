"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-zinc-500 text-sm max-w-sm">
              Commercial and industrial radar solutions for precision detection and monitoring.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=traffic" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  Traffic Radar
                </Link>
              </li>
              <li>
                <Link href="/shop?category=automotive" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  Automotive ADAS
                </Link>
              </li>
              <li>
                <Link href="/shop?category=water-level" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  Water Level Sensors
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:info@radarcart.com" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  info@radarcart.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">
            © {currentYear} Radar Cart. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-zinc-600 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>System Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
