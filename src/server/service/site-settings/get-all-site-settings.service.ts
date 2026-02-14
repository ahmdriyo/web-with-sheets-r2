import { NextResponse } from "next/server";
import { findAllSiteSettings } from "../../repositories/site-settings/find-all-site-settings.repository";

export async function getSiteSettings(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const result = await findAllSiteSettings(page, limit);
    return NextResponse.json({
      message: "Site settings fetched!",
      ...result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch site settings" },
      { status: 500 },
    );
  }
}
