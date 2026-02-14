/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "./Badge";
import type { Cars } from "@/src/types/cars.type";

interface CarCardProps {
  car: Cars;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/cars/${car.slug}`} className="group block">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-700">
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-gray-800">
          <img
            src={car.primary_image_url || car.image_urls[0]}
            alt={car.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {car.is_featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="warning">Featured</Badge>
            </div>
          )}
          {car.status === "sold" && (
            <div className="absolute top-3 right-3">
              <Badge variant="default">Sold</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Price */}
          <div className="text-2xl font-bold text-white mb-2">
            {formatPrice(car.price)}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-100 mb-3 line-clamp-1 group-hover:text-gray-300 transition-colors">
            {car.brand} {car.model} {car.title}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{car.year}</span>
            <span>•</span>
            <span className="capitalize">{car.transmission}</span>
            <span>•</span>
            <span className="capitalize">{car.fuel_type}</span>
          </div>

          {/* Mileage */}
          <div className="mt-3 text-sm text-gray-400">
            {car.mileage.toLocaleString("id-ID")} km
          </div>
        </div>
      </div>
    </Link>
  );
};
