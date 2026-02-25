"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Container, Section } from "@/src/components/ui";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { useCars } from "@/src/hooks/useCars";
import { useSiteSettings } from "@/src/hooks/useSiteSettings";
import type { Cars } from "@/src/types/cars.type";
import { CarSkeleton } from "@/src/components/ui/CarSkeleton";
import CarNotfound from "@/src/components/ui/CarNotfound";
import { ImageGallery } from "./ImageGallery";
import { CarInfo } from "./CarInfo";
import { FaArrowLeft } from "react-icons/fa";

interface CarDetailViewProps {
  slug: string;
}

export const CarDetailView: React.FC<CarDetailViewProps> = ({ slug }) => {
  const router = useRouter();

  // Fetch cars and filter by slug
  const { data: carsData, isLoading } = useCars(1, 100);
  const { data: settingsData } = useSiteSettings();

  const car = useMemo((): Cars | undefined => {
    return carsData?.data?.find((c) => c.slug === slug);
  }, [carsData, slug]);

  const whatsappNumber = settingsData?.data?.whatsapp_number || "";

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
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow group cursor-pointer"
          >
            <FaArrowLeft className="w-4 h-4" />
            <p className="text-md font-semibold">Kembali</p>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <ImageGallery
              images={allImages}
              title={carTitle}
              isFeatured={car.is_featured}
            />

            {/* Car Details */}
            <CarInfo car={car} whatsappNumber={whatsappNumber} />
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
