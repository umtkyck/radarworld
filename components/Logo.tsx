"use client";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: { icon: 28, text: "text-base" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 40, text: "text-xl" },
};

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-sweep" x1="50" y1="50" x2="74" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#34D399" stopOpacity="0" />
            <stop offset="1" stopColor="#34D399" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="24" fill="#0F172A" />
        <circle cx="50" cy="50" r="34" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="4" />
        <circle cx="50" cy="50" r="20" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="4" />
        <path d="M50 50 L50 16 A34 34 0 0 1 74 26 Z" fill="url(#logo-sweep)" />
        <line x1="50" y1="50" x2="74" y2="26" stroke="#34D399" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="74" cy="26" r="5.5" fill="#34D399" />
        <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
      </svg>
      {showText && (
        <span className={`${text} font-semibold tracking-tight`}>
          <span className="text-slate-900">Radar</span>
          <span className="text-slate-400">Cart</span>
        </span>
      )}
    </div>
  );
}
