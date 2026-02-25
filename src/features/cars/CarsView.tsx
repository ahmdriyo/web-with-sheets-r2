"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Section, Input, CarCard } from "@/src/components/ui";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { useCars } from "@/src/hooks/useCars";
import { useSiteSettings } from "@/src/hooks/useSiteSettings";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useBrands } from "@/src/hooks/useBrands";
import { useModels } from "@/src/hooks/useModels";
import { useCategories } from "@/src/hooks/useCategories";
import { FilterSelect } from "@/src/components/ui/FilterSelect";

export const CarsView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "",
  );
  const [selectedModel, setSelectedModel] = useState(
    searchParams.get("model") || "",
  );
  const [selectedFuel, setSelectedFuel] = useState(
    searchParams.get("fuelType") || "",
  );
  const [selectedTransmission, setSelectedTransmission] = useState(
    searchParams.get("transmission") || "",
  );
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get("year") || "",
  );

  // Generate years from 1980 to current year (newest first)
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const yearList: number[] = [];
    for (let y = currentYear; y >= 1980; y--) {
      yearList.push(y);
    }
    return yearList;
  }, [currentYear]);

  const limit = 8;

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch filter data from API
  const { data: categoriesData } = useCategories(1, 1000); // Get all categories
  const { data: brandsData } = useBrands(1, 1000); // Get all brands
  const { data: modelsData } = useModels(1, 1000); // Get all models

  // Build filters object
  const filters = {
    search: debouncedSearch || undefined,
    category: selectedCategory || undefined,
    brand: selectedBrand || undefined,
    model: selectedModel || undefined,
    fuelType: selectedFuel || undefined,
    transmission: selectedTransmission || undefined,
    year: selectedYear || undefined,
  };

  const { data: carsData, isLoading } = useCars(page, limit, filters);
  const { data: settingsData } = useSiteSettings();

  const whatsappNumber = settingsData?.data?.whatsapp_number || "";

  // Get all categories
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData?.data],
  );

  // Get all brands
  const brands = useMemo(() => brandsData?.data || [], [brandsData?.data]);

  // Filter models based on selected brand
  const filteredModels = useMemo(() => {
    if (!modelsData?.data) return [];
    if (!selectedBrand) return modelsData.data;

    // Find the selected brand's ID
    const selectedBrandObj = brands.find((b) => b.name === selectedBrand);
    if (!selectedBrandObj) return modelsData.data;

    // Filter models by brand ID
    return modelsData.data.filter(
      (model) => model.id_brand === selectedBrandObj.id,
    );
  }, [modelsData?.data, selectedBrand, brands]);

  const totalPages = carsData?.pagination?.totalPages || 1;
  const totalItems = carsData?.pagination?.totalItems || 0;

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
      page: page > 1 ? page : "",
      search: debouncedSearch,
      category: selectedCategory,
      brand: selectedBrand,
      model: selectedModel,
      fuelType: selectedFuel,
      transmission: selectedTransmission,
      year: selectedYear,
    };

    updateURLParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    debouncedSearch,
    selectedCategory,
    selectedBrand,
    selectedModel,
    selectedFuel,
    selectedTransmission,
    selectedYear,
  ]);

  // Reset to page 1 when filters change
  const handleFilterChange =
    (setter: (value: string) => void) => (value: string) => {
      setter(value);
      setPage(1);
    };

  // Handle brand change - reset model when brand changes
  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedModel(""); // Reset model when brand changes
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
      <Section className="bg-zinc-900 shadow-sm py-16!">
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Category Filter */}
              <FilterSelect
                value={selectedCategory}
                onChange={handleFilterChange(setSelectedCategory)}
                placeholder="Semua Kategori"
                options={categories.map((c) => ({
                  value: c.name,
                  label: c.name,
                }))}
              />

              {/* Brand Filter */}
              <FilterSelect
                value={selectedBrand}
                onChange={handleBrandChange}
                placeholder="Semua Merek"
                options={brands.map((b) => ({ value: b.name, label: b.name }))}
              />

              {/* Model Filter */}
              <FilterSelect
                value={selectedModel}
                onChange={handleFilterChange(setSelectedModel)}
                placeholder={selectedBrand ? "Semua Model" : "Pilih Merek Dulu"}
                disabled={!selectedBrand}
                options={filteredModels.map((m) => ({
                  value: m.name,
                  label: m.name,
                }))}
              />

              {/* Fuel Type Filter */}
              <FilterSelect
                value={selectedFuel}
                onChange={handleFilterChange(setSelectedFuel)}
                placeholder="Semua Jenis Bahan Bakar"
                options={[
                  { value: "bensin", label: "Bensin" },
                  { value: "diesel", label: "Diesel" },
                  { value: "hybrid", label: "Hybrid" },
                  { value: "electric", label: "Electric" },
                ]}
              />

              {/* Transmission Filter */}
              <FilterSelect
                value={selectedTransmission}
                onChange={handleFilterChange(setSelectedTransmission)}
                placeholder="Semua Jenis Transmisi"
                options={[
                  { value: "manual", label: "Manual" },
                  { value: "automatic", label: "Automatic" },
                ]}
              />

              {/* Year Filter */}
              <FilterSelect
                value={selectedYear}
                onChange={handleFilterChange(setSelectedYear)}
                placeholder="Semua Tahun"
                options={years.map((y) => ({
                  value: String(y),
                  label: String(y),
                }))}
              />
            </div>

            {/* Active Filters Info */}
            {(debouncedSearch ||
              selectedCategory ||
              selectedBrand ||
              selectedModel ||
              selectedFuel ||
              selectedTransmission ||
              selectedYear) && (
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
