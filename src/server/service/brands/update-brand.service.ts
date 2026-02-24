import { NextResponse } from "next/server";
import { updateBrand as updateBrandRepo } from "../../repositories/brands/update-brand.repository";

export async function updateBrand(id: string, req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    const brand = await updateBrandRepo(id, { name });

    if (!brand) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update brand" },
      { status: 500 },
    );
  }
}
