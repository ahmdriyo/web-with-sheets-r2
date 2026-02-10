import { NextResponse } from "next/server";
import { createMenu as createMenuRepo } from "../../repositories/menu/create-menu.repository";
import { uploadImages } from "../../storage/r2.service";

export async function createMenu(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("image") as File[];
    if (!files.length) {
      return NextResponse.json(
        { message: "At least one image is required" },
        { status: 400 },
      );
    }

    const imageUrls = await uploadImages(files);
    const menu = await createMenuRepo({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      category: formData.get("category") as string,
      imageUrls,
    });
    return NextResponse.json(menu);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add menu" },
      { status: 500 },
    );
  }
}
