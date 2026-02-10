import { NextResponse } from "next/server";
import { deleteMenuById as deleteMenuByIdRepo } from "../../repositories/menu/delete-menu.repository";

export async function deleteMenuById(menuId: string) {
  const deleted = await deleteMenuByIdRepo(menuId);

  if (!deleted) {
    return NextResponse.json({ message: "Menu not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Menu deleted!" });
}
