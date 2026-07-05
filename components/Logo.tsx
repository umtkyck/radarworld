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
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="6" fill="#0F172A" />
        <circle cx="12" cy="12" r="7" stroke="#ffffff" strokeWidth="1.2" opacity="0.4" fill="none" />
        <circle cx="12" cy="12" r="4" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" fill="none" />
        <line x1="12" y1="12" x2="17" y2="7" stroke="#34D399" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="1.5" fill="#34D399" />
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
