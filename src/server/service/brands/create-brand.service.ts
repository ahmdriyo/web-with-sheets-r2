import { NextResponse } from "next/server";
import { createBrand as createBrandRepo } from "../../repositories/brands/create-brand.repository";

export async function createBrand(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    const brand = await createBrandRepo({ name });
    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add brand." },
      { status: 500 },
    );
  }
}
