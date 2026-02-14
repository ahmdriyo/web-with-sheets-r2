import { NextResponse } from "next/server";
import { findSiteSettingById } from "../../repositories/site-settings/find-by-id-site-settings.repository";

export async function getOneSiteSetting(id: string) {
  try {
    const setting = await findSiteSettingById(id);

    if (!setting) {
      return NextResponse.json(
        { message: "Site setting not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Site setting fetched!",
      data: setting,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch site setting" },
      { status: 500 },
    );
  }
}
