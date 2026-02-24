"use client";

import React from "react";
import Link from "next/link";
import type { Cars } from "@/src/types/cars.type";
import Image from "next/image";

interface CarCardProps {
  car: Cars;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/cars/${car.slug}`} className="group block">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-gray-600">
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-gray-800">
          <Image
            src={car.primary_image_url || car.image_urls[0]}
            alt={car.title}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Price */}
          <div className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
            {formatPrice(car.price)}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-100 mb-3 line-clamp-1 group-hover:text-white transition-colors duration-300">
            {car.brand} {car.model} {car.title}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            <span>{car.year}</span>
            <span>•</span>
            <span className="capitalize">{car.transmission}</span>
            <span>•</span>
            <span className="capitalize">{car.fuel_type}</span>
          </div>

          {/* Mileage */}
          <div className="mt-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {car.mileage.toLocaleString("id-ID")} km
          </div>
        </div>
      </div>
    </Link>
  );
};
