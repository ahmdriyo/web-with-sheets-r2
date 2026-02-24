import { NextResponse } from "next/server";
import { updateSiteSetting as updateSiteSettingRepo } from "../../repositories/site-settings/update-site-settings.repository";

export async function updateSiteSetting(req: Request) {
  try {
    const body = await req.json();
    const {
      whatsapp_number,
      showroom_address,
      instagram,
      google_maps,
      embed_maps,
      email,
      opening_hours,
    } = body;

    const setting = await updateSiteSettingRepo({
      whatsapp_number,
      showroom_address,
      instagram,
      google_maps,
      embed_maps,
      email,
      opening_hours,
    });

    if (!setting) {
      return NextResponse.json(
        { message: "Site setting not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(setting);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update site settings" },
      { status: 500 },
    );
  }
}
