import { NextResponse } from "next/server";
import { findAbout } from "../../repositories/about/find-about.repository";

export async function getAbout(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const result = await findAbout(page, limit);
    return NextResponse.json({
      message: "About fetched!",
      ...result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch about" },
      { status: 500 },
    );
  }
}
