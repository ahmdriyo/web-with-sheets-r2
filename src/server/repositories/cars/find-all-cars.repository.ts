import { CarsListDTO } from "@/src/types/cars.type";
import { sheetsData } from "../../infra/google.sheets.client";
import { CARS_RANGE } from "./cars.constants";
import { mapRowToCar } from "./cars.mapper";

interface CarsFilters {
  search?: string;
  category?: string;
  brand?: string;
  model?: string;
  fuelType?: string;
  year?: string;
  transmission?: string;
  status?: string;
}

export async function findAllCars(
  page: number,
  limit: number,
  filters?: CarsFilters,
) {
  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: CARS_RANGE,
  });

  const rows = (response.data.values ?? []) as string[][];

  // Map all rows to car objects
  let cars: CarsListDTO[] = rows.map((row) => {
    const car = mapRowToCar(row);
    const { ...carWithoutDescription } = car;
    return carWithoutDescription;
  });

  // Apply filters
  if (filters) {
    cars = cars.filter((car) => {
      // Search filter (case-insensitive, matches brand, model, or title)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          car.brand?.toLowerCase().includes(searchLower) ||
          car.model?.toLowerCase().includes(searchLower) ||
          car.title?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Brand filter
      if (
        filters.brand &&
        car.brand?.toLowerCase() !== filters.brand.toLowerCase()
      ) {
        return false;
      }

      // Model filter
      if (
        filters.model &&
        car.model?.toLowerCase() !== filters.model.toLowerCase()
      ) {
        return false;
      }

      // Fuel type filter
      if (
        filters.fuelType &&
        car.fuel_type?.toLowerCase() !== filters.fuelType.toLowerCase()
      ) {
        return false;
      }

      // Transmission filter
      if (
        filters.transmission &&
        car.transmission?.toLowerCase() !== filters.transmission.toLowerCase()
      ) {
        return false;
      }

      // Year filter
      if (filters.year && car.year?.toString() !== filters.year.toLowerCase()) {
        return false;
      }

      // Category filter
      if (
        filters.category &&
        car.category?.toLowerCase() !== filters.category.toLowerCase()
      ) {
        return false;
      }

      // Status filter
      if (
        filters.status &&
        car.status?.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }

  const totalItems = cars.length;
  const startIndex = (page - 1) * limit;
  const paginatedCars = cars.slice(startIndex, startIndex + limit);

  return {
    data: paginatedCars,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}
