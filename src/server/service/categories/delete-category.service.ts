import { NextResponse } from "next/server";
import { deleteCategory as deleteCategoryRepo } from "../../repositories/categories/delete-category.repository";

export async function deleteCategory(id: string) {
  try {
    const result = await deleteCategoryRepo(id);

    if (!result) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 },
    );
  }
}
