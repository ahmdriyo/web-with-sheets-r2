"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/src/components/ui/AdminLayout";
import { Card } from "@/src/components/ui/Card";
import { Toast, useToast } from "@/src/components/ui/Toast";
import { useAbout, useUpdateAbout } from "@/src/hooks/useAbout";

export const AboutAdminView = () => {
  const { data: aboutData, isLoading } = useAbout();
  const updateMutation = useUpdateAbout();
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ourMission: "",
    ourVision: "",
    carsSold: "",
    happyCustomers: "",
    yearsExperience: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load existing about data
  useEffect(() => {
    if (aboutData?.data) {
      const about = aboutData.data;
      setFormData({
        title: about.title || "",
        description: about.description || "",
        ourMission: about.ourMission || "",
        ourVision: about.ourVision || "",
        carsSold: about.carsSold || "",
        happyCustomers: about.happyCustomers || "",
        yearsExperience: about.yearsExperience || "",
      });
    }
  }, [aboutData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.ourMission.trim()) {
      newErrors.ourMission = "Our Mission is required";
    }
    if (!formData.ourVision.trim()) {
      newErrors.ourVision = "Our Vision is required";
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
      const aboutId = aboutData?.data?.id;
      if (!aboutId) {
        showToast("About data not found", "error");
        return;
      }

      await updateMutation.mutateAsync({
        id: aboutId,
        data: formData,
      });
      showToast("About updated successfully", "success");
    } catch (error) {
      showToast("Failed to update about", "error");
      console.error("Failed to update about:", error);
    }
  };

  const isSaving = updateMutation.isPending;

  return (
    <AdminLayout title="About Us" subtitle="Manage about page information">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">About Us</h2>
          <p className="text-zinc-400">
            Configure your company information and statistics
          </p>
        </div>

        {/* About Card */}
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
                <p className="text-zinc-400">Loading about data...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., About Our Company"
                  className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border ${
                    errors.title ? "border-red-500" : "border-zinc-700"
                  } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-400">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell your company story..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border ${
                    errors.description ? "border-red-500" : "border-zinc-700"
                  } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none resize-none`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Our Mission */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Our Mission <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="ourMission"
                  value={formData.ourMission}
                  onChange={handleChange}
                  placeholder="What is your company mission?"
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border ${
                    errors.ourMission ? "border-red-500" : "border-zinc-700"
                  } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none resize-none`}
                />
                {errors.ourMission && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.ourMission}
                  </p>
                )}
              </div>

              {/* Our Vision */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Our Vision <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="ourVision"
                  value={formData.ourVision}
                  onChange={handleChange}
                  placeholder="What is your company vision?"
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border ${
                    errors.ourVision ? "border-red-500" : "border-zinc-700"
                  } text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none resize-none`}
                />
                {errors.ourVision && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.ourVision}
                  </p>
                )}
              </div>

              {/* Statistics Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-700">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Cars Sold
                  </label>
                  <input
                    type="text"
                    name="carsSold"
                    value={formData.carsSold}
                    onChange={handleChange}
                    placeholder="e.g., 1000+"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Happy Customers
                  </label>
                  <input
                    type="text"
                    name="happyCustomers"
                    value={formData.happyCustomers}
                    onChange={handleChange}
                    placeholder="e.g., 500+"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Years Experience
                  </label>
                  <input
                    type="text"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    placeholder="e.g., 10+"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                  />
                </div>
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
