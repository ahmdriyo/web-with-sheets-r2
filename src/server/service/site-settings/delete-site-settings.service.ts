import { NextResponse } from "next/server";
import { deleteSiteSetting as deleteSiteSettingRepo } from "../../repositories/site-settings/delete-site-settings.repository";

export async function deleteSiteSetting(id: string) {
  try {
    const result = await deleteSiteSettingRepo(id);

    if (!result) {
      return NextResponse.json(
        { message: "Site setting not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete site settings" },
      { status: 500 },
    );
  }
}
