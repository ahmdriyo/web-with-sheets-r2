import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  subtitle,
}) => {
  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-border">
          {title && (
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
