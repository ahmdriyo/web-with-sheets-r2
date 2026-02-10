import { NextResponse } from "next/server";
import { findCarById } from "../../repositories/cars/find-by-id-cars.repository";

export async function getOneCar(id: string) {
  try {
    const car = await findCarById(id);

    if (!car) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Car fetched successfully!",
      data: car,
    });
  } catch (error) {
    console.error("GET ONE CAR ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch car" },
      { status: 500 },
    );
  }
}
