"use client";

import React, { useState } from "react";
import { Container, Section, Input, CarCard } from "@/src/components/ui";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { useCars } from "@/src/hooks/useCars";
import { useSiteSettings } from "@/src/hooks/useSiteSettings";
import { useDebounce } from "@/src/hooks/useDebounce";

export const CarsView = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const limit = 8;

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Build filters object
  const filters = {
    search: debouncedSearch || undefined,
    brand: selectedBrand || undefined,
    fuelType: selectedFuel || undefined,
    transmission: selectedTransmission || undefined,
    category: selectedCategory || undefined,
  };

  const { data: carsData, isLoading } = useCars(page, limit, filters);
  const { data: settingsData } = useSiteSettings();

  const whatsappNumber = settingsData?.data?.whatsapp_number || "";

  // Get unique brands from all cars (we'll need to fetch this separately or cache it)
  const uniqueBrands = Array.from(
    new Set(carsData?.data?.map((car) => car.brand) || []),
  );

  // Get unique categories
  const uniqueCategories = Array.from(
    new Set(carsData?.data?.map((car) => car.category) || []),
  );

  const totalPages = carsData?.pagination?.totalPages || 1;
  const totalItems = carsData?.pagination?.totalItems || 0;

  // Reset to page 1 when filters change
  const handleFilterChange =
    (setter: (value: string) => void) => (value: string) => {
      setter(value);
      setPage(1);
    };

  return (
    <div className="min-h-screen bg-black">
      {/* Header with Background */}
      <div className="relative min-h-[40vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/back2.png)" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/60" />
        </div>

        {/* Header Content */}
        <Container className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-2xl">
            Koleksi Kami
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-lg">
            Cari {totalItems} Kendaraan Premium Impian Anda
          </p>
        </Container>
      </div>

      {/* Search & Filters */}
      <Section className="bg-zinc-900 shadow-sm py-4">
        <Container>
          <div className="space-y-4">
            {/* Search */}
            <Input
              type="text"
              placeholder="Cari berdasarkan merek, model, atau judul..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1); // Reset to first page on search
              }}
              className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus:ring-white focus:border-white"
            />

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={selectedBrand}
                onChange={(e) =>
                  handleFilterChange(setSelectedBrand)(e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
              >
                <option value="">Semua Merek</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) =>
                  handleFilterChange(setSelectedCategory)(e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
              >
                <option value="">Semua Kategori</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedFuel}
                onChange={(e) =>
                  handleFilterChange(setSelectedFuel)(e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
              >
                <option value="">Semua Jenis Bahan Bakar</option>
                <option value="bensin">Bensin</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>

              <select
                value={selectedTransmission}
                onChange={(e) =>
                  handleFilterChange(setSelectedTransmission)(e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
              >
                <option value="">Semua Jenis Transmisi</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>

            {/* Active Filters Info */}
            {(debouncedSearch ||
              selectedBrand ||
              selectedFuel ||
              selectedTransmission ||
              selectedCategory) && (
              <div className="text-sm text-gray-400">
                Menampilkan {totalItems} hasil
                {debouncedSearch && ` untuk "${debouncedSearch}"`}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Cars Grid */}
      <Section className="bg-zinc-900! pt-4!">
        <Container>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shadow-lg"
                >
                  <div className="relative">
                    {/* Image Skeleton */}
                    <div className="w-full h-56 bg-zinc-700 animate-pulse relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-600/50 to-transparent animate-shimmer"></div>
                    </div>
                    {/* Badge Skeleton */}
                    <div className="absolute top-4 left-4 w-20 h-6 bg-zinc-600 rounded-full animate-pulse"></div>
                  </div>
                  <div className="p-5 space-y-4">
                    {/* Category Badge Skeleton */}
                    <div className="w-16 h-5 bg-zinc-700 rounded-full animate-pulse"></div>
                    {/* Brand & Model Skeleton */}
                    <div className="space-y-2">
                      <div className="h-6 bg-zinc-700 rounded-lg w-3/4 animate-pulse"></div>
                      <div className="h-8 bg-zinc-700 rounded-lg w-full animate-pulse"></div>
                    </div>
                    {/* Button Skeleton */}
                    <div className="h-11 bg-zinc-700 rounded-lg w-full animate-pulse mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : carsData?.data && carsData.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carsData.data.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">
                Tidak ada mobil yang cocok dengan kriteria Anda. Coba ubah kata
                kunci pencarian atau filter Anda.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white disabled:opacity-50 hover:bg-zinc-800 transition-colors"
              >
                Sebelumnya
              </button>
              <div className="flex items-center px-4 py-2 text-sm text-gray-300">
                Halaman {page} dari {totalPages}
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white disabled:opacity-50 hover:bg-zinc-800 transition-colors"
              >
                Selanjutnya
              </button>
            </div>
          )}
        </Container>
      </Section>

      {/* WhatsApp Button */}
      {whatsappNumber && <WhatsAppButton phoneNumber={whatsappNumber} />}
    </div>
  );
};
