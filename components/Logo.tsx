"use client";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: { icon: 28, text: "text-lg", gap: "gap-2", padding: "p-1.5" },
  md: { icon: 32, text: "text-xl", gap: "gap-2.5", padding: "p-2" },
  lg: { icon: 40, text: "text-2xl", gap: "gap-3", padding: "p-2.5" },
};

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const { icon, text, gap, padding } = sizes[size];

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <div className="relative">
        <div className={`${padding} rounded-xl bg-emerald-500/10 border border-emerald-500/20`}>
          <svg
            width={icon}
            height={icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center dot */}
            <circle cx="12" cy="12" r="2" fill="#10B981" />
            {/* Radar circles */}
            <circle cx="12" cy="12" r="5" stroke="#10B981" strokeWidth="1.5" opacity="0.8" fill="none" />
            <circle cx="12" cy="12" r="8" stroke="#10B981" strokeWidth="1" opacity="0.5" fill="none" />
            <circle cx="12" cy="12" r="11" stroke="#10B981" strokeWidth="0.75" opacity="0.3" fill="none" />
          </svg>
        </div>
      </div>
      {showText && (
        <span className={`${text} font-bold tracking-tight`}>
          <span className="text-white">Radar</span>
          <span className="text-emerald-400">Cart</span>
        </span>
      )}
    </div>
  );
}
