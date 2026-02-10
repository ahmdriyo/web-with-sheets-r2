import { NextResponse } from "next/server";
import { updateCategory as updateCategoryRepo } from "../../repositories/categories/update-categories.repository";

export async function updateCategory(id: string, req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    const category = await updateCategoryRepo(id, { name });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 },
    );
  }
}
