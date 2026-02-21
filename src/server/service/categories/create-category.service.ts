import { NextResponse } from "next/server";
import { createCategory as createCategoryRepo } from "../../repositories/categories/create-category.repository";

export async function createCategory(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    const category = await createCategoryRepo({ name });
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add category." },
      { status: 500 },
    );
  }
}
