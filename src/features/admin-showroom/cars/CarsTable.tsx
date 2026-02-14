"use client";

import React from "react";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/src/components/ui/Table";
import type { Cars } from "@/src/types/cars.type";

interface CarsTableProps {
  cars: Cars[];
  onEdit: (car: Cars) => void;
  onDelete: (car: Cars) => void;
  isLoading?: boolean;
}

export const CarsTable: React.FC<CarsTableProps> = ({
  cars,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-900/30 text-green-300 border-green-800/50";
      case "sold":
        return "bg-red-900/30 text-red-300 border-red-800/50";
      case "booked":
        return "bg-yellow-900/30 text-yellow-300 border-yellow-800/50";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  if (isLoading) {
    return (
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
          <p className="text-zinc-400">Loading cars...</p>
        </div>
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-12 border border-zinc-800 rounded-lg">
        <svg
          className="w-12 h-12 text-zinc-700 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="text-lg font-medium text-zinc-300 mb-2">No cars yet</h3>
        <p className="text-zinc-500">
          Get started by adding your first vehicle
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map((car) => (
          <TableRow key={car.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                  {car.primary_image_url ? (
                    <Image
                      src={car.primary_image_url}
                      alt={car.title || "Car image"}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-zinc-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">{car.title}</p>
                  <p className="text-sm text-zinc-500">{car.model}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-zinc-300">{car.brand}</span>
            </TableCell>
            <TableCell>
              <span className="text-zinc-300">{car.year}</span>
            </TableCell>
            <TableCell>
              <span className="font-medium text-white">
                {formatPrice(car.price)}
              </span>
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  car.status,
                )}`}
              >
                {car.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                {/* Edit Button */}
                <button
                  onClick={() => onEdit(car)}
                  className="p-2 text-zinc-400 hover:text-purple-400 hover:bg-purple-900/20 rounded-lg transition-all group relative"
                  title="Edit car"
                >
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(car)}
                  className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all group relative"
                  title="Delete car"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
