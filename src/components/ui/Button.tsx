import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center cursor-pointer";

  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
