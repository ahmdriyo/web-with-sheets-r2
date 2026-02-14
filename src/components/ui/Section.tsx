import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "brown";
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  background = "white",
}) => {
  const bgStyles = {
    white: "bg-white",
    gray: "bg-gray-50",
    brown: "!bg-gray-800",
  };

  return (
    <section className={`py-12 md:py-20 ${bgStyles[background]} ${className}`}>
      {children}
    </section>
  );
};
