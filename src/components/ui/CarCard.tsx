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
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/cars/${car.slug}`} className="group block">
      <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-border hover:border-accent">
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
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
          <div className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {formatPrice(car.price)}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-card-foreground mb-3 line-clamp-1 group-hover:text-foreground transition-colors duration-300">
            {car.brand} {car.model} {car.title}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-card-foreground transition-colors duration-300">
            <span>{car.year}</span>
            <span>•</span>
            <span className="capitalize">{car.transmission}</span>
            <span>•</span>
            <span className="capitalize">{car.fuel_type}</span>
          </div>

          {/* Mileage */}
          <div className="mt-3 text-sm text-muted-foreground group-hover:text-card-foreground transition-colors duration-300">
            {car.mileage.toLocaleString("id-ID")} km
          </div>
        </div>
      </div>
    </Link>
  );
};
