"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/src/components/ui/AdminLayout";
import { Dialog } from "@/src/components/ui/Dialog";
import { Toast, useToast } from "@/src/components/ui/Toast";
import { CategoriesTable } from "./CategoriesTable";
import { CategoryModal } from "./CategoryModal";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/src/hooks/useCategories";

interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const CategoriesView = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // Queries and Mutations
  const { data: categoriesData, isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const { toast, showToast, hideToast } = useToast();

  // Handlers
  const handleCreateCategory = async (data: { name: string }) => {
    try {
      await createMutation.mutateAsync(data);
      setIsCreateModalOpen(false);
      showToast("Category created successfully", "success");
    } catch (error) {
      showToast("Failed to create category", "error");
      console.error("Failed to create category:", error);
    }
  };

  const handleEditCategory = async (data: { name: string }) => {
    if (!selectedCategory) return;

    try {
      await updateMutation.mutateAsync({
        id: selectedCategory.id,
        data,
      });
      setIsEditModalOpen(false);
      setSelectedCategory(null);
      showToast("Category updated successfully", "success");
    } catch (error) {
      showToast("Failed to update category", "error");
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      await deleteMutation.mutateAsync(selectedCategory.id);
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
      showToast("Category deleted successfully", "success");
    } catch (error) {
      showToast("Failed to delete category", "error");
      console.error("Failed to delete category:", error);
    }
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout title="Categories" subtitle="Manage vehicle categories">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Categories</h2>
            <p className="text-zinc-400">
              Manage vehicle categories for your showroom
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all flex items-center gap-2 shadow-lg shadow-purple-900/30"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Category
          </button>
        </div>

        {/* Table */}
        <CategoriesTable
          categories={categoriesData?.data || []}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
          isLoading={isLoading}
        />

        {/* Create Modal */}
        <CategoryModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateCategory}
          isLoading={createMutation.isPending}
        />

        {/* Edit Modal */}
        <CategoryModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleEditCategory}
          category={selectedCategory}
          isLoading={updateMutation.isPending}
        />

        {/* Delete Dialog */}
        <Dialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedCategory(null);
          }}
          onConfirm={handleDeleteCategory}
          title="Delete Category"
          message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          isLoading={deleteMutation.isPending}
        />

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

export default CategoriesView;
