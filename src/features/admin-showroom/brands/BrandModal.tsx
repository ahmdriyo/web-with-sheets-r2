"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/src/components/ui/Modal";

interface Brand {
  id: string;
  name: string;
}

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
  brand?: Brand | null;
  isLoading?: boolean;
}

export const BrandModal: React.FC<BrandModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  brand,
  isLoading,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (brand) {
        setName(brand.name);
      } else {
        setName("");
      }
      setError("");
    }
  }, [isOpen, brand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Brand name is required");
      return;
    }

    onSubmit({ name: name.trim() });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={brand ? "Edit Brand" : "Add Brand"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="e.g., Toyota, Honda, BMW"
            className={`w-full px-4 py-2.5 rounded-lg bg-zinc-800 border ${
              error ? "border-red-500" : "border-zinc-700"
            } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
            disabled={isLoading}
          />
          {error && (
            <p className="mt-2 text-sm text-red-400 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-lg bg-linear-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : brand ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
