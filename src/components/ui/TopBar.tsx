"use client";

import React from "react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle, action }) => {
  return (
    <div className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">
      {/* Title Section */}
      <div>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Action Button (if provided) */}
        {action && <div>{action}</div>}

        {/* Search */}
        <button className="text-zinc-400 hover:text-white transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Notifications */}
        <button className="text-zinc-400 hover:text-white transition-colors relative">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-purple-600 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
          A
        </div>
      </div>
    </div>
  );
};
