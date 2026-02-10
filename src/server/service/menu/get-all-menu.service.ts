import { NextResponse } from "next/server";
import { findAllMenu } from "../../repositories/menu/find-all-menu.repository";

export async function getMenus(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const result = await findAllMenu(page, limit);
    return NextResponse.json({
      message: "Menu fetched!",
      ...result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch menu" },
      { status: 500 },
    );
  }
}
