"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="sm" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-500">
              Doppler radar sensors for rail, agriculture, and sports electronics
              &mdash; with custom engineering from prototype to production.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-widest text-zinc-600">
              Products
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?category=ground-speed" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Ground Speed Sensor
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sports" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Sports Tracking Radar
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-widest text-zinc-600">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:info@radarcart.com" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  info@radarcart.com
                </a>
              </li>
              <li>
                <a href="tel:+12246299664" className="text-sm text-zinc-500 transition-colors hover:text-white">
                  +1 (224) 629-9664
                </a>
              </li>
              <li className="text-sm leading-relaxed text-zinc-500">
                1109 W Bauer Rd
                <br />
                Naperville, IL 60563, US
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-mono text-xs text-zinc-600">
            © {currentYear} Radar Cart. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>System Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
