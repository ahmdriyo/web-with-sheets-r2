"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "@/src/components/ui/Modal";
import { Card } from "@/src/components/ui/Card";
import { ImageUploader } from "@/src/components/ui/ImageUploader";
import { useCategories } from "@/src/hooks/useCategories";
import { useBrands } from "@/src/hooks/useBrands";
import { useModels } from "@/src/hooks/useModels";
import type { Cars } from "@/src/types/cars.type";

interface ImageFile {
  file?: File;
  url: string;
  id: string;
}

interface CarFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  car?: Cars | null;
  isLoading?: boolean;
}

export const CarForm: React.FC<CarFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  car,
  isLoading,
}) => {
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands(1, 100);
  const { data: modelsData } = useModels(1, 1000);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    mileage: "",
    transmission: "automatic" as "automatic" | "manual",
    fuel_type: "bensin" as "bensin" | "diesel" | "hybrid" | "electric",
    condition: "used" as "new" | "used",
    seats: "5",
    engine_cc: "",
    color: "",
    status: "available" as "available" | "sold" | "booked",
    is_featured: false,
    description: "",
  });

  const [images, setImages] = useState<ImageFile[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");

  // Filter models based on selected brand
  const filteredModels = useMemo(() => {
    if (!modelsData?.data || !selectedBrandId) return [];
    return modelsData.data.filter(
      (model) => model.id_brand === selectedBrandId,
    );
  }, [modelsData?.data, selectedBrandId]);

  // Load car data for edit mode
  useEffect(() => {
    if (isOpen) {
      if (car) {
        // Find brand ID from brand name
        const brandId =
          brandsData?.data?.find((b) => b.name === car.brand)?.id || "";
        setSelectedBrandId(brandId);

        setFormData({
          category: car.category || "",
          title: car.title || "",
          brand: car.brand || "",
          model: car.model || "",
          year: car.year || new Date().getFullYear(),
          price: car.price?.toString() || "",
          mileage: car.mileage?.toString() || "",
          transmission: car.transmission || "automatic",
          fuel_type: car.fuel_type || "bensin",
          condition: car.condition || "used",
          seats: car.seats?.toString() || "5",
          engine_cc: car.engine_cc?.toString() || "",
          color: car.color || "",
          status: car.status || "available",
          is_featured: car.is_featured || false,
          description: car.description || "",
        });

        // Load existing images
        const existingImages =
          car.image_urls?.map((url, index) => ({
            url,
            id: `existing-${index}`,
          })) || [];
        setImages(existingImages);
      } else {
        // Reset for create mode
        setSelectedBrandId("");
        setFormData({
          category: "",
          title: "",
          brand: "",
          model: "",
          year: new Date().getFullYear(),
          price: "",
          mileage: "",
          transmission: "automatic",
          fuel_type: "bensin",
          condition: "used",
          seats: "5",
          engine_cc: "",
          color: "",
          status: "available",
          is_featured: false,
          description: "",
        });
        setImages([]);
      }
      setErrors({});
    }
  }, [isOpen, car, brandsData?.data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.year || formData.year < 1900) newErrors.year = "Invalid year";

    // For create mode, require at least one image
    if (!car && images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, value.toString());
      }
    });

    // Append images
    images.forEach((image) => {
      if (image.file) {
        data.append("images", image.file);
      }
    });

    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={car ? "Edit Car" : "Add New Car"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Info */}
        <Card title="Basic Information" className="border-0 bg-zinc-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Toyota Fortuner VRZ TRD"
                className={`w-full px-4 py-2.5 rounded-lg bg-zinc-900 border ${
                  errors.title ? "border-red-500" : "border-zinc-700"
                } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg bg-zinc-900 border ${
                  errors.category ? "border-red-500" : "border-zinc-700"
                } text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
              >
                <option value="">Select category</option>
                {categoriesData?.data?.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-400">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Brand <span className="text-red-400">*</span>
              </label>
              <select
                name="brand"
                value={selectedBrandId}
                onChange={(e) => {
                  const brandId = e.target.value;
                  const brandName =
                    brandsData?.data?.find((b) => b.id === brandId)?.name || "";
                  setSelectedBrandId(brandId);
                  setFormData((prev) => ({
                    ...prev,
                    brand: brandName,
                    model: "",
                  }));
                  if (errors.brand) {
                    setErrors((prev) => ({ ...prev, brand: "", model: "" }));
                  }
                }}
                className={`w-full px-4 py-2.5 rounded-lg bg-zinc-900 border ${
                  errors.brand ? "border-red-500" : "border-zinc-700"
                } text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
              >
                <option value="">Select a brand</option>
                {brandsData?.data?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="mt-1 text-sm text-red-400">{errors.brand}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Model <span className="text-red-400">*</span>
              </label>
              <select
                name="model"
                value={formData.model}
                onChange={(e) => {
                  const modelName = e.target.value;
                  setFormData((prev) => ({ ...prev, model: modelName }));
                  if (errors.model) {
                    setErrors((prev) => ({ ...prev, model: "" }));
                  }
                }}
                disabled={!selectedBrandId}
                className={`w-full px-4 py-2.5 rounded-lg bg-zinc-900 border ${
                  errors.model ? "border-red-500" : "border-zinc-700"
                } text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <option value="">
                  {selectedBrandId ? "Select a model" : "Select a brand first"}
                </option>
                {filteredModels.map((model) => (
                  <option key={model.id} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
              {errors.model && (
                <p className="mt-1 text-sm text-red-400">{errors.model}</p>
              )}
              {selectedBrandId && filteredModels.length === 0 && (
                <p className="mt-1 text-sm text-zinc-400">
                  No models available for this brand
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Year <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear() + 1}
                className={`w-full px-4 py-2.5 rounded-lg bg-zinc-900 border ${
                  errors.year ? "border-red-500" : "border-zinc-700"
                } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
              />
              {errors.year && (
                <p className="mt-1 text-sm text-red-400">{errors.year}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Price (IDR) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 500000000"
                className={`w-full px-4 py-2.5 rounded-lg bg-zinc-900 border ${
                  errors.price ? "border-red-500" : "border-zinc-700"
                } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-400">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Mileage (km)
              </label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                placeholder="e.g., 15000"
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Vehicle Details */}
        <Card title="Vehicle Details" className="border-0 bg-zinc-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Fuel Type
              </label>
              <select
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
              >
                <option value="bensin">Bensin</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
              >
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Seats
              </label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                min="2"
                max="50"
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Engine CC
              </label>
              <input
                type="number"
                name="engine_cc"
                value={formData.engine_cc}
                onChange={handleChange}
                placeholder="e.g., 2755"
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g., White Pearl"
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
        </Card>

        {/* Section 3: Status */}
        <Card title="Status & Visibility" className="border-0 bg-zinc-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="booked">Booked</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-offset-0"
                />
                <span className="text-sm font-medium text-zinc-300">
                  Featured Vehicle
                </span>
              </label>
            </div>
          </div>
        </Card>

        {/* Section 4: Description */}
        <Card title="Description" className="border-0 bg-zinc-800/50">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe the vehicle condition, features, and any additional details..."
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none resize-none"
          />
        </Card>

        {/* Section 5: Images */}
        <Card title="Vehicle Images" className="border-0 bg-zinc-800/50">
          <ImageUploader images={images} onChange={setImages} maxImages={10} />
          {errors.images && (
            <p className="mt-2 text-sm text-red-400">{errors.images}</p>
          )}
        </Card>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-5 py-2.5 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {car ? "Update Car" : "Add Car"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
