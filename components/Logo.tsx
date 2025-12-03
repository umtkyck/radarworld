"use client";

import { memo } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = memo(function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 40, text: "text-2xl" },
    lg: { icon: 56, text: "text-4xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Modern Radar SVG Logo */}
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]"
        >
          {/* Outer ring */}
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />

          {/* Middle ring */}
          <circle
            cx="24"
            cy="24"
            r="16"
            stroke="#00F0FF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />

          {/* Inner ring */}
          <circle
            cx="24"
            cy="24"
            r="10"
            stroke="#00F0FF"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />

          {/* Center dot */}
          <circle
            cx="24"
            cy="24"
            r="3"
            fill="#00FF41"
            className="animate-pulse"
          />

          {/* Radar sweep line */}
          <line
            x1="24"
            y1="24"
            x2="24"
            y2="4"
            stroke="url(#gradient2)"
            strokeWidth="2"
            strokeLinecap="round"
            className="origin-center animate-spin-slow"
          />

          {/* Target blips */}
          <circle cx="32" cy="12" r="2" fill="#00FF41" opacity="0.8" />
          <circle cx="38" cy="28" r="1.5" fill="#00FF41" opacity="0.6" />
          <circle cx="14" cy="18" r="1.5" fill="#00FF41" opacity="0.7" />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#00FF41" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-bold font-mono tracking-tight text-white leading-none`}>
            RADAR<span className="text-radar-cyan">WORLD</span>
          </span>
          <span className="text-[10px] font-mono text-radar-muted tracking-[0.2em] uppercase">
            Detection Systems
          </span>
        </div>
      )}
    </div>
  );
});

export default Logo;
