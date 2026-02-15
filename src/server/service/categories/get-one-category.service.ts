import { NextResponse } from "next/server";
import { findCategoryById } from "../../repositories/categories/find-by-id-category.repository";

export async function getOneCategory(id: string) {
  try {
    const category = await findCategoryById(id);
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      message: "Category fetched successfully!",
      data: category,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch category." },
      { status: 500 },
    );
  }
}
