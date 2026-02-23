"use client";

import React, { useState, useMemo } from "react";
import { AdminLayout } from "@/src/components/ui/AdminLayout";
import { CarsFilters } from "./CarsFilters";
import { CarsTable } from "./CarsTable";
import { CarForm } from "./CarForm";
import { Dialog } from "@/src/components/ui/Dialog";
import { Toast, useToast } from "@/src/components/ui/Toast";
import {
  useCars,
  useCreateCar,
  useUpdateCar,
  useDeleteCar,
} from "@/src/hooks/useCars";
import type { Cars } from "@/src/types/cars.type";

export const CarsView: React.FC = () => {
  const { data: carsData, isLoading } = useCars();
  const createCarMutation = useCreateCar();
  const updateCarMutation = useUpdateCar();
  const deleteCarMutation = useDeleteCar();
  const { toast, showToast, hideToast } = useToast();

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Cars | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Get unique brands from cars data
  const uniqueBrands = useMemo(() => {
    if (!carsData?.data) return [];
    const brands = carsData.data
      .map((car) => car.brand)
      .filter((brand): brand is string => !!brand);
    return Array.from(new Set(brands)).sort();
  }, [carsData?.data]);

  // Filtered and searched cars
  const filteredCars = useMemo(() => {
    if (!carsData?.data) return [];

    return carsData.data.filter((car) => {
      const matchesSearch =
        car.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand =
        !brandFilter || car.brand?.toLowerCase() === brandFilter.toLowerCase();

      const matchesStatus =
        !statusFilter ||
        car.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesBrand && matchesStatus;
    });
  }, [carsData?.data, searchQuery, brandFilter, statusFilter]);

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
        // Update existing car
        await updateCarMutation.mutateAsync({
          id: selectedCar.id!,
          formData,
        });
        showToast("Car updated successfully", "success");
      } else {
        // Create new car
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

  return (
    <AdminLayout title="Cars" subtitle="Manage showroom vehicles">
      <div className="space-y-6">
        {/* Filters */}
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
        <CarsFilters
          search={searchQuery}
          onSearchChange={setSearchQuery}
          brand={brandFilter}
          onBrandChange={setBrandFilter}
          status={statusFilter}
          onStatusChange={setStatusFilter}
          brands={uniqueBrands}
        />

        {/* Table */}
        <CarsTable
          cars={filteredCars}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
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
