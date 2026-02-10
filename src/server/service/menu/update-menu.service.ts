import { NextResponse } from "next/server";
import { updateMenuById as updateMenuByIdRepo } from "../../repositories/menu/update-menu.repository";
import { uploadSingleImage } from "../../storage/r2.service";

export async function updateMenuById(req: Request, menuId: string) {
  const formData = await req.formData();

  const payload = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    category: formData.get("category") as string,
  };

  const file = formData.get("image") as File | null;

  let imageUrl: string | undefined;

  if (file && file.size > 0) {
    imageUrl = await uploadSingleImage(file, "menu");
  }

  const updated = await updateMenuByIdRepo(menuId, {
    ...payload,
    imageUrl,
  });

  if (!updated) {
    return NextResponse.json({ message: "Menu not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Menu updated!" });
}
