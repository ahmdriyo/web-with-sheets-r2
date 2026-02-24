"use client";

import React, { useState, useMemo } from "react";
import { AdminLayout } from "@/src/components/ui/AdminLayout";
import { Dialog } from "@/src/components/ui/Dialog";
import { Toast, useToast } from "@/src/components/ui/Toast";
import { Pagination } from "@/src/components/ui/Pagination";
import { ModelsTable } from "./ModelsTable";
import { ModelModal } from "./ModelModal";
import {
  useModels,
  useCreateModel,
  useUpdateModel,
  useDeleteModel,
} from "@/src/hooks/useModels";
import { useBrands } from "@/src/hooks/useBrands";
import { useCategories } from "@/src/hooks/useCategories";

interface Model {
  id: string;
  id_brand: string;
  id_category?: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const ModelsView = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Queries and Mutations
  const { data: modelsData, isLoading } = useModels(currentPage, limit);
  const { data: brandsData, isLoading: brandsLoading } = useBrands(1, 100);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories(
    1,
    100,
  );
  const createMutation = useCreateModel();
  const updateMutation = useUpdateModel();
  const deleteMutation = useDeleteModel();
  const { toast, showToast, hideToast } = useToast();

  // Enrich models with brand names and category names
  const enrichedModels = useMemo(() => {
    if (!modelsData?.data || !brandsData?.data || !categoriesData?.data)
      return [];

    return modelsData.data.map((model) => ({
      ...model,
      brand_name:
        brandsData.data.find((b) => b.id === model.id_brand)?.name || "Unknown",
      category_name:
        categoriesData.data.find((c) => c.id === model.id_category)?.name ||
        "Uncategorized",
    }));
  }, [modelsData, brandsData, categoriesData]);

  // Handlers
  const handleCreateModel = async (data: {
    name: string;
    id_brand: string;
    id_category?: string;
  }) => {
    try {
      await createMutation.mutateAsync(data);
      setIsCreateModalOpen(false);
      showToast("Model created successfully", "success");
    } catch (error) {
      showToast("Failed to create model", "error");
      console.error("Failed to create model:", error);
    }
  };

  const handleEditModel = async (data: {
    name: string;
    id_brand: string;
    id_category?: string;
  }) => {
    if (!selectedModel) return;

    try {
      await updateMutation.mutateAsync({
        id: selectedModel.id,
        data,
      });
      setIsEditModalOpen(false);
      setSelectedModel(null);
      showToast("Model updated successfully", "success");
    } catch (error) {
      showToast("Failed to update model", "error");
      console.error("Failed to update model:", error);
    }
  };

  const handleDeleteModel = async () => {
    if (!selectedModel) return;

    try {
      await deleteMutation.mutateAsync(selectedModel.id);
      setIsDeleteDialogOpen(false);
      setSelectedModel(null);
      showToast("Model deleted successfully", "success");
    } catch (error) {
      showToast("Failed to delete model", "error");
      console.error("Failed to delete model:", error);
    }
  };

  const openEditModal = (model: Model) => {
    setSelectedModel(model);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (model: Model) => {
    setSelectedModel(model);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout title="Models" subtitle="Manage vehicle models">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Models</h2>
            <p className="text-zinc-400">
              Manage vehicle models for your showroom
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
            Add Model
          </button>
        </div>

        {/* Table */}
        <ModelsTable
          models={enrichedModels}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
          isLoading={isLoading || brandsLoading || categoriesLoading}
        />

        {/* Create Modal */}
        <ModelModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateModel}
          brands={brandsData?.data || []}
          categories={categoriesData?.data || []}
          isLoading={createMutation.isPending}
        />

        {/* Edit Modal */}
        <ModelModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedModel(null);
          }}
          onSubmit={handleEditModel}
          model={selectedModel}
          brands={brandsData?.data || []}
          categories={categoriesData?.data || []}
          isLoading={updateMutation.isPending}
        />

        {/* Delete Dialog */}
        <Dialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedModel(null);
          }}
          onConfirm={handleDeleteModel}
          title="Delete Model"
          message={`Are you sure you want to delete "${selectedModel?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          isLoading={deleteMutation.isPending}
        />

        {/* Pagination */}
        {modelsData?.pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={modelsData.pagination.totalPages}
            onPageChange={setCurrentPage}
            isLoading={isLoading}
          />
        )}

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

export default ModelsView;
