import { NextResponse } from "next/server";
import { findBrandById } from "../../repositories/brands/find-by-id-brand.repository";

export async function getOneBrand(id: string) {
  try {
    const brand = await findBrandById(id);
    if (!brand) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }
    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch brand." },
      { status: 500 },
    );
  }
}
