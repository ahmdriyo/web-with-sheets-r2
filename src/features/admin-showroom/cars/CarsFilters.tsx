"use client";

import React from "react";

interface CarsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  brand: string;
  onBrandChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  brands: string[];
}

export const CarsFilters: React.FC<CarsFiltersProps> = ({
  search,
  onSearchChange,
  brand,
  onBrandChange,
  status,
  onStatusChange,
  brands,
}) => {
  const statuses: { value: string; label: string }[] = [
    { value: "", label: "All Status" },
    { value: "available", label: "Available" },
    { value: "sold", label: "Sold" },
    { value: "booked", label: "Booked" },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-zinc-400"
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
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, brand, or model..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <select
            value={brand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
