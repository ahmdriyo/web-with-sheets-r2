"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/src/components/ui/AdminLayout";
import { Card } from "@/src/components/ui/Card";
import { Toast, useToast } from "@/src/components/ui/Toast";
import {
  useSiteSettings,
  useUpdateSiteSetting,
} from "@/src/hooks/useSiteSettings";

const SiteSettingsView = () => {
  const { data: settingsData, isLoading } = useSiteSettings();
  const updateMutation = useUpdateSiteSetting();
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    whatsapp_number: "",
    showroom_address: "",
    instagram: "",
    google_maps: "",
    embed_maps: "",
    email: "",
    opening_hours: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load existing settings
  useEffect(() => {
    if (settingsData?.data) {
      const settings = settingsData.data;
      setFormData({
        whatsapp_number: settings.whatsapp_number || "",
        showroom_address: settings.showroom_address || "",
        instagram: settings.instagram || "",
        google_maps: settings.google_maps || "",
        embed_maps: settings.embed_maps || "",
        email: settings.email || "",
        opening_hours: settings.opening_hours || "",
      });
    }
  }, [settingsData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.whatsapp_number.trim()) {
      newErrors.whatsapp_number = "WhatsApp number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await updateMutation.mutateAsync(formData);
      showToast("Settings updated successfully", "success");
    } catch (error) {
      showToast("Failed to save settings", "error");
      console.error("Failed to save settings:", error);
    }
  };

  const isSaving = updateMutation.isPending;

  return (
    <AdminLayout title="Site Settings" subtitle="Manage showroom information">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Site Settings</h2>
          <p className="text-zinc-400">
            Configure your showroom contact information and details
          </p>
        </div>

        {/* Settings Card */}
        <Card>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <svg
                  className="animate-spin h-8 w-8 text-purple-600 mx-auto mb-4"
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
                <p className="text-zinc-400">Loading settings...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  WhatsApp Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  placeholder="e.g., 081234567890"
                  className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border ${
                    errors.whatsapp_number
                      ? "border-red-500"
                      : "border-zinc-700"
                  } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
                />
                {errors.whatsapp_number && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.whatsapp_number}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., contact@showroom.com"
                  className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border ${
                    errors.email ? "border-red-500" : "border-zinc-700"
                  } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Showroom Address */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Showroom Address
                </label>
                <textarea
                  name="showroom_address"
                  value={formData.showroom_address}
                  onChange={handleChange}
                  placeholder="e.g., Jl. Raya No. 123, Jakarta"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Instagram Handle
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="e.g., showroom_official"
                    className="w-full pl-4 pr-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              {/* Google Maps */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Google Maps Link
                </label>
                <input
                  type="url"
                  name="google_maps"
                  value={formData.google_maps}
                  onChange={handleChange}
                  placeholder="e.g., https://maps.google.com/..."
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Embed Google Maps URL
                </label>
                <input
                  type="url"
                  name="embed_maps"
                  value={formData.embed_maps}
                  onChange={handleChange}
                  placeholder="e.g., https://maps.google.com/..."
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* Opening Hours */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Opening Hours
                </label>
                <input
                  type="text"
                  name="opening_hours"
                  value={formData.opening_hours}
                  onChange={handleChange}
                  placeholder="e.g., Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end pt-6 border-t border-zinc-800">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                  >
                    {isSaving ? (
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
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Card>

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsView;
