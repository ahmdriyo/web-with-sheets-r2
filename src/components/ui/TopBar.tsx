"use client";

import React from "react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle }) => {
  return (
    <div className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">
      {/* Title Section */}
      <div>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
          A
        </div>
      </div>
    </div>
  );
};
