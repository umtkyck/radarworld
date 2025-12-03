"use client";

import { Radio } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: { icon: 20, text: "text-lg", gap: "gap-2" },
  md: { icon: 24, text: "text-xl", gap: "gap-2.5" },
  lg: { icon: 32, text: "text-2xl", gap: "gap-3" },
};

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const { icon, text, gap } = sizes[size];

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <div className="relative">
        <div className="p-2 rounded-lg bg-emerald-500/10">
          <Radio size={icon} className="text-emerald-400" strokeWidth={2} />
        </div>
      </div>
      {showText && (
        <span className={`${text} font-bold tracking-tight`}>
          <span className="text-white">Radar</span>
          <span className="text-emerald-400">World</span>
        </span>
      )}
    </div>
  );
}
