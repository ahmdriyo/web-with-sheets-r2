import { NextResponse } from "next/server";
import { findAllSiteSettings } from "../../repositories/site-settings/find-all-site-settings.repository";

export async function getSiteSettings() {
  try {
    const result = await findAllSiteSettings();

    if (!result) {
      return NextResponse.json(
        { message: "Site settings not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Site settings fetched!",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch site settings" },
      { status: 500 },
    );
  }
}
