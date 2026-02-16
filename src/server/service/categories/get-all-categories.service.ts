import { NextResponse } from "next/server";
import { findAllCategories } from "../../repositories/categories/find-all-categories.repository";

export async function getCategories(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const result = await findAllCategories(page, limit);
    return NextResponse.json({
      message: "Categories fetched!",
      ...result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch categories." },
      { status: 500 },
    );
  }
}
