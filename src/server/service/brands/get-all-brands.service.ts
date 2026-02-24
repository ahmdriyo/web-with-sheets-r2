import { NextResponse } from "next/server";
import { findAllBrands } from "../../repositories/brands/find-all-brands.repository";

export async function getBrands(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const result = await findAllBrands(page, limit);
    return NextResponse.json({
      message: "Brands fetched!",
      ...result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch brands." },
      { status: 500 },
    );
  }
}
