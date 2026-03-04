import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "brown" | "dark";
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  background = "white",
}) => {
  const bgStyles = {
    white: "bg-background",
    gray: "bg-card",
    brown: "!bg-muted",
    dark: "bg-card",
  };

  return (
    <section className={`py-12 md:py-20 ${bgStyles[background]} ${className}`}>
      {children}
    </section>
  );
};
