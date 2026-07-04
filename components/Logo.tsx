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
        <circle cx="12" cy="12" r="10.5" stroke="#10B981" strokeWidth="1" opacity="0.4" fill="none" />
        <circle cx="12" cy="12" r="6.5" stroke="#10B981" strokeWidth="1" opacity="0.7" fill="none" />
        <line x1="12" y1="1.5" x2="12" y2="5" stroke="#10B981" strokeWidth="1" opacity="0.5" />
        <line x1="12" y1="19" x2="12" y2="22.5" stroke="#10B981" strokeWidth="1" opacity="0.5" />
        <line x1="1.5" y1="12" x2="5" y2="12" stroke="#10B981" strokeWidth="1" opacity="0.5" />
        <line x1="19" y1="12" x2="22.5" y2="12" stroke="#10B981" strokeWidth="1" opacity="0.5" />
        <circle cx="12" cy="12" r="1.75" fill="#10B981" />
      </svg>
      {showText && (
        <span className={`${text} font-medium tracking-tight`}>
          <span className="text-white">Radar</span>
          <span className="text-zinc-500">Cart</span>
        </span>
      )}
    </div>
  );
}
