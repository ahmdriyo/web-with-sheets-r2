import { NextResponse } from "next/server";
import { findAllCars } from "../../repositories/cars/find-all-cars.repository";

export async function getCars(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // Extract filter parameters
    const filters = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      brand: searchParams.get("brand") || undefined,
      model: searchParams.get("model") || undefined,
      fuelType: searchParams.get("fuelType") || undefined,
      transmission: searchParams.get("transmission") || undefined,
    };

    const result = await findAllCars(page, limit, filters);

    return NextResponse.json({
      message: "Cars fetched successfully!",
      ...result,
    });
  } catch (error) {
    console.error("GET ALL CARS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch cars" },
      { status: 500 },
    );
  }
}
