"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/src/components/ui/AdminLayout";
import { Dialog } from "@/src/components/ui/Dialog";
import { Toast, useToast } from "@/src/components/ui/Toast";
import { Pagination } from "@/src/components/ui/Pagination";
import { BrandsTable } from "./BrandsTable";
import { BrandModal } from "./BrandModal";
import {
  useBrands,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
} from "@/src/hooks/useBrands";

interface Brand {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const BrandsView = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Queries and Mutations
  const { data: brandsData, isLoading } = useBrands(currentPage, limit);
  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand();
  const deleteMutation = useDeleteBrand();
  const { toast, showToast, hideToast } = useToast();

  // Handlers
  const handleCreateBrand = async (data: { name: string }) => {
    try {
      await createMutation.mutateAsync(data);
      setIsCreateModalOpen(false);
      showToast("Brand created successfully", "success");
    } catch (error) {
      showToast("Failed to create brand", "error");
      console.error("Failed to create brand:", error);
    }
  };

  const handleEditBrand = async (data: { name: string }) => {
    if (!selectedBrand) return;

    try {
      await updateMutation.mutateAsync({
        id: selectedBrand.id,
        data,
      });
      setIsEditModalOpen(false);
      setSelectedBrand(null);
      showToast("Brand updated successfully", "success");
    } catch (error) {
      showToast("Failed to update brand", "error");
      console.error("Failed to update brand:", error);
    }
  };

  const handleDeleteBrand = async () => {
    if (!selectedBrand) return;

    try {
      await deleteMutation.mutateAsync(selectedBrand.id);
      setIsDeleteDialogOpen(false);
      setSelectedBrand(null);
      showToast("Brand deleted successfully", "success");
    } catch (error) {
      showToast("Failed to delete brand", "error");
      console.error("Failed to delete brand:", error);
    }
  };

  const openEditModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout title="Brands" subtitle="Manage vehicle brands">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Brands</h2>
            <p className="text-zinc-400">
              Manage vehicle brands for your showroom
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
            Add Brand
          </button>
        </div>

        {/* Table */}
        <BrandsTable
          brands={brandsData?.data || []}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
          isLoading={isLoading}
        />

        {/* Create Modal */}
        <BrandModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateBrand}
          isLoading={createMutation.isPending}
        />

        {/* Edit Modal */}
        <BrandModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedBrand(null);
          }}
          onSubmit={handleEditBrand}
          brand={selectedBrand}
          isLoading={updateMutation.isPending}
        />

        {/* Delete Dialog */}
        <Dialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedBrand(null);
          }}
          onConfirm={handleDeleteBrand}
          title="Delete Brand"
          message={`Are you sure you want to delete "${selectedBrand?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          isLoading={deleteMutation.isPending}
        />

        {/* Pagination */}
        {brandsData?.pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={brandsData.pagination.totalPages}
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

export default BrandsView;
