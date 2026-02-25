"use client";

import React, { useMemo } from "react";
import { FilterSelect } from "@/src/components/ui/FilterSelect";

interface CarsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  brand: string;
  onBrandChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  year: string;
  onYearChange: (value: string) => void;
  brands: string[];
}

export const CarsFilters: React.FC<CarsFiltersProps> = ({
  search,
  onSearchChange,
  brand,
  onBrandChange,
  status,
  onStatusChange,
  year,
  onYearChange,
  brands,
}) => {
  const statusOptions = [
    { value: "available", label: "Available" },
    { value: "sold", label: "Sold" },
    { value: "booked", label: "Booked" },
  ];

  const brandOptions = brands.map((b) => ({ value: b, label: b }));

  // Generate years from 1980 to current year (newest first)
  const currentYear = new Date().getFullYear();
  const yearOptions = useMemo(() => {
    const list: { value: string; label: string }[] = [];
    for (let y = currentYear; y >= 1980; y--) {
      list.push({ value: String(y), label: String(y) });
    }
    return list;
  }, [currentYear]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
        <FilterSelect
          value={brand}
          onChange={onBrandChange}
          placeholder="All Brands"
          options={brandOptions}
        />

        {/* Status Filter */}
        <FilterSelect
          value={status}
          onChange={onStatusChange}
          placeholder="All Status"
          options={statusOptions}
        />

        {/* Year Filter */}
        <FilterSelect
          value={year}
          onChange={onYearChange}
          placeholder="All Years"
          options={yearOptions}
        />
      </div>
    </div>
  );
};
