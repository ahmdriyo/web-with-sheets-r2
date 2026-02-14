import { NextResponse } from "next/server";
import { findMenuById } from "../../repositories/menu/find-by-id-menu.repository";

export async function getMenuById(menuId: string) {
  const menu = await findMenuById(menuId);

  if (!menu) {
    return NextResponse.json({ message: "Menu not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Menu by id fetched!",
    data: menu,
  });
}
