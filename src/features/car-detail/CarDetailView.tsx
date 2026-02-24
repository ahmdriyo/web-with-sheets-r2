"use client";

import React, { useState, useMemo } from "react";
import { Container, Section, Button, Badge } from "@/src/components/ui";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { useCars } from "@/src/hooks/useCars";
import { useSiteSettings } from "@/src/hooks/useSiteSettings";
import type { Cars } from "@/src/types/cars.type";
import { CarSkeleton } from "@/src/components/ui/CarSkeleton";
import CarNotfound from "@/src/components/ui/CarNotfound";
import Image from "next/image";

interface CarDetailViewProps {
  slug: string;
}

export const CarDetailView: React.FC<CarDetailViewProps> = ({ slug }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch cars and filter by slug
  const { data: carsData, isLoading } = useCars(1, 100);
  const { data: settingsData } = useSiteSettings();

  const car = useMemo((): Cars | undefined => {
    return carsData?.data?.find((c) => c.slug === slug);
  }, [carsData, slug]);

  const whatsappNumber = settingsData?.data?.whatsapp_number || "";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return <CarSkeleton />;
  }

  if (!car) {
    return <CarNotfound />;
  }

  const allImages = car.image_urls || [car.primary_image_url];
  const carTitle = `${car.brand} ${car.model} ${car.title}`;
  const whatsappMessage = `Halo, saya tertarik dengan ${carTitle}`;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Section className="py-8 md:py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={allImages[selectedImage]}
                  alt={carTitle}
                  className="w-full h-full object-cover"
                />
                {car.is_featured && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="warning">Unggulan</Badge>
                  </div>
                )}
              </div>
              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === index
                          ? "border-black"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${carTitle} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Details */}
            <div className="space-y-8">
              {/* Price */}
              <div>
                <div className="text-4xl md:text-5xl font-bold text-black mb-2">
                  {formatPrice(car.price)}
                </div>
                <Badge
                  variant={car.status === "available" ? "success" : "denger"}
                  className="text-sm"
                >
                  {car.status === "available"
                    ? "Tersedia"
                    : car.status === "sold"
                      ? "Terjual"
                      : car.status}
                </Badge>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {carTitle}
                </h1>
                <p className="text-lg text-gray-600">
                  Category: {car.category}
                </p>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Brand</div>
                  <div className="font-semibold text-gray-900">{car.brand}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Model</div>
                  <div className="font-semibold text-gray-900">{car.model}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Year</div>
                  <div className="font-semibold text-gray-900">{car.year}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Mileage</div>
                  <div className="font-semibold text-gray-900">
                    {car.mileage.toLocaleString("id-ID")} km
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Transmission</div>
                  <div className="font-semibold text-gray-900 capitalize">
                    {car.transmission}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Fuel Type</div>
                  <div className="font-semibold text-gray-900 capitalize">
                    {car.fuel_type}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Seats</div>
                  <div className="font-semibold text-gray-900">{car.seats}</div>
                </div>
                {car.engine_cc && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Engine</div>
                    <div className="font-semibold text-gray-900">
                      {car.engine_cc} cc
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Color</div>
                  <div className="font-semibold text-gray-900">{car.color}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Condition</div>
                  <div className="font-semibold text-gray-900 capitalize">
                    {car.condition}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {car.description}
                </p>
              </div>

              {/* CTA Button */}
              {car.status === "available" && whatsappNumber && (
                <div className="sticky bottom-4">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      const formattedPhone = whatsappNumber.replace(/\D/g, "");
                      const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappMessage)}`;
                      window.open(url, "_blank");
                    }}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Contact via WhatsApp
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* WhatsApp Button */}
      {whatsappNumber && (
        <WhatsAppButton
          phoneNumber={whatsappNumber}
          message={whatsappMessage}
        />
      )}
    </div>
  );
};
