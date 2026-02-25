import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "denger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const variantStyles: Record<string, string> = {
    default:
      "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 ring-1 ring-gray-300/50",
    success:
      "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 ring-1 ring-emerald-300/50 shadow-[0_0_8px_rgba(16,185,129,0.15)]",
    warning:
      "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 ring-1 ring-amber-300/50 shadow-[0_0_8px_rgba(245,158,11,0.15)]",
    denger:
      "bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 ring-1 ring-rose-300/50 shadow-[0_0_8px_rgba(244,63,94,0.15)]",
  };

  const dotColors: Record<string, string> = {
    default: "bg-gray-400",
    success: "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]",
    warning: "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]",
    denger: "bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.5)]",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-4 py-1.5 text-sm gap-2",
  };

  const dotSizes: Record<string, string> = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md font-semibold tracking-wide transition-all duration-200 hover:scale-105 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      <span
        className={`${dotSizes[size]} rounded-md ${dotColors[variant]} animate-pulse`}
      />
      {children}
    </span>
  );
};
