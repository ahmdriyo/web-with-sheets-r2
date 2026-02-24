"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/src/components/ui/Modal";

interface Model {
  id: string;
  id_brand: string;
  id_category?: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface ModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    id_brand: string;
    id_category?: string;
  }) => void;
  model?: Model | null;
  brands: Brand[];
  categories: Category[];
  isLoading?: boolean;
}

export const ModelModal: React.FC<ModelModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  model,
  brands,
  categories,
  isLoading,
}) => {
  const [name, setName] = useState("");
  const [idBrand, setIdBrand] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [errors, setErrors] = useState({ name: "", brand: "", category: "" });

  useEffect(() => {
    if (isOpen) {
      if (model) {
        setName(model.name);
        setIdBrand(model.id_brand);
        setIdCategory(model.id_category || "");
      } else {
        setName("");
        setIdBrand("");
        setIdCategory("");
      }
      setErrors({ name: "", brand: "", category: "" });
    }
  }, [isOpen, model]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { name: "", brand: "", category: "" };

    if (!name.trim()) {
      newErrors.name = "Model name is required";
    }

    if (!idBrand) {
      newErrors.brand = "Brand is required";
    }

    if (newErrors.name || newErrors.brand) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: name.trim(),
      id_brand: idBrand,
      id_category: idCategory || undefined,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={model ? "Edit Model" : "Add Model"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Brand <span className="text-red-400">*</span>
          </label>
          <select
            value={idBrand}
            onChange={(e) => {
              setIdBrand(e.target.value);
              setErrors({ ...errors, brand: "" });
            }}
            className={`w-full px-4 py-2.5 rounded-lg bg-zinc-800 border ${
              errors.brand ? "border-red-500" : "border-zinc-700"
            } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
            disabled={isLoading}
          >
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.brand && (
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
              {errors.brand}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Category
          </label>
          <select
            value={idCategory}
            onChange={(e) => {
              setIdCategory(e.target.value);
              setErrors({ ...errors, category: "" });
            }}
            className={`w-full px-4 py-2.5 rounded-lg bg-zinc-800 border ${
              errors.category ? "border-red-500" : "border-zinc-700"
            } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
            disabled={isLoading}
          >
            <option value="">Select a category (optional)</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
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
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Model Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: "" });
            }}
            placeholder="e.g., Fortuner, Civic, X5"
            className={`w-full px-4 py-2.5 rounded-lg bg-zinc-800 border ${
              errors.name ? "border-red-500" : "border-zinc-700"
            } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
            disabled={isLoading}
          />
          {errors.name && (
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
              {errors.name}
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
            ) : model ? (
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
