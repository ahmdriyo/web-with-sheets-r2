"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/src/hooks/useDebounce";
import { AdminLayout } from "@/src/components/ui/AdminLayout";
import { CarsFilters } from "./CarsFilters";
import { CarsTable } from "./CarsTable";
import { CarForm } from "./CarForm";
import { Dialog } from "@/src/components/ui/Dialog";
import { Toast, useToast } from "@/src/components/ui/Toast";
import { Pagination } from "@/src/components/ui/Pagination";
import {
  useCars,
  useCreateCar,
  useUpdateCar,
  useDeleteCar,
} from "@/src/hooks/useCars";
import { useBrands } from "@/src/hooks/useBrands";
import type { Cars } from "@/src/types/cars.type";

export const CarsAdminView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [brandFilter, setBrandFilter] = useState(
    searchParams.get("brand") || "",
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "",
  );
  const [yearFilter, setYearFilter] = useState(searchParams.get("year") || "");

  const limit = 10;

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Build filters object for API
  const filters = {
    search: debouncedSearch || undefined,
    brand: brandFilter || undefined,
    status: statusFilter || undefined,
    year: yearFilter || undefined,
  };

  // Fetch data from API with filters
  const { data: carsData, isLoading } = useCars(currentPage, limit, filters);
  const { data: brandsData } = useBrands(1, 1000);
  const createCarMutation = useCreateCar();
  const updateCarMutation = useUpdateCar();
  const deleteCarMutation = useDeleteCar();
  const { toast, showToast, hideToast } = useToast();

  // Get brands list from API
  const brands = brandsData?.data?.map((b) => b.name) || [];

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Cars | null>(null);

  // Update URL params
  const updateURLParams = (params: Record<string, string | number>) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, String(value));
      } else {
        currentParams.delete(key);
      }
    });

    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  // Sync filters to URL whenever they change
  useEffect(() => {
    const params: Record<string, string | number> = {
      page: currentPage > 1 ? currentPage : "",
      search: debouncedSearch,
      brand: brandFilter,
      status: statusFilter,
      year: yearFilter,
    };

    updateURLParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearch, brandFilter, statusFilter, yearFilter]);

  // Reset to page 1 when filters change
  const handleFilterChange =
    (setter: (value: string) => void) => (value: string) => {
      setter(value);
      setCurrentPage(1);
    };

  // Handlers
  const handleAddClick = () => {
    setSelectedCar(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (car: Cars) => {
    setSelectedCar(car);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (car: Cars) => {
    setSelectedCar(car);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      if (selectedCar) {
        await updateCarMutation.mutateAsync({
          id: selectedCar.id!,
          formData,
        });
        showToast("Car updated successfully", "success");
      } else {
        await createCarMutation.mutateAsync(formData);
        showToast("Car added successfully", "success");
      }
      setIsFormOpen(false);
      setSelectedCar(null);
    } catch (error) {
      console.error("Error saving car:", error);
      showToast("Failed to save car", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCar?.id) return;

    try {
      await deleteCarMutation.mutateAsync(selectedCar.id);
      showToast("Car deleted successfully", "success");
      setIsDeleteDialogOpen(false);
      setSelectedCar(null);
    } catch (error) {
      console.error("Error deleting car:", error);
      showToast("Failed to delete car", "error");
    }
  };

  const totalPages = carsData?.pagination?.totalPages || 1;

  return (
    <AdminLayout title="Cars" subtitle="Manage showroom vehicles">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Cars</h2>
            <p className="text-zinc-400">
              Manage vehicles available in your showroom
            </p>
          </div>
          <button
            onClick={handleAddClick}
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
            Add Car
          </button>
        </div>

        {/* Filters */}
        <CarsFilters
          search={searchQuery}
          onSearchChange={(v) => {
            setSearchQuery(v);
            setCurrentPage(1);
          }}
          brand={brandFilter}
          onBrandChange={handleFilterChange(setBrandFilter)}
          status={statusFilter}
          onStatusChange={handleFilterChange(setStatusFilter)}
          year={yearFilter}
          onYearChange={handleFilterChange(setYearFilter)}
          brands={brands}
        />

        {/* Table */}
        <CarsTable
          cars={carsData?.data || []}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* Car Form Modal */}
      <CarForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCar(null);
        }}
        onSubmit={handleFormSubmit}
        car={selectedCar}
        isLoading={createCarMutation.isPending || updateCarMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedCar(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Car"
        message={`Are you sure you want to delete "${selectedCar?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={deleteCarMutation.isPending}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </AdminLayout>
  );
};
