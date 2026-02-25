"use client";

import React, { useState, useRef, useEffect } from "react";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder: string;
  disabled?: boolean;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-left text-white focus:ring-2 focus:ring-white focus:border-white transition-all flex items-center justify-between gap-2 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${value ? "text-white" : "text-gray-400"}`}
      >
        <span className="truncate text-sm">{selectedLabel}</span>
        <svg
          className={`w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg bg-zinc-800 border border-zinc-700 shadow-xl overflow-hidden">
          <div className="max-h-[300px] overflow-y-auto scrollbar-thin">
            {/* Placeholder / "All" option */}
            <button
              type="button"
              onClick={() => handleSelect("")}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-zinc-700 ${
                !value ? "bg-zinc-700 text-white font-medium" : "text-gray-300"
              }`}
            >
              {placeholder}
            </button>
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-zinc-700 ${
                  value === opt.value
                    ? "bg-zinc-700 text-white font-medium"
                    : "text-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
