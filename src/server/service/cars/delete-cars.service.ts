import { NextResponse } from "next/server";
import { deleteCar as deleteCarRepo } from "../../repositories/cars/delete-cars.repository";

export async function deleteCar(id: string) {
  try {
    const result = await deleteCarRepo(id);

    if (!result) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Car deleted successfully!",
    });
  } catch (error) {
    console.error("DELETE CAR ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete car" },
      { status: 500 },
    );
  }
}
