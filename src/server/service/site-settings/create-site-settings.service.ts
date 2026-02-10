import { NextResponse } from "next/server";
import { createSiteSetting as createSiteSettingRepo } from "../../repositories/site-settings/create-site-settings.repository";

export async function createSiteSetting(req: Request) {
  try {
    const body = await req.json();
    const {
      whatsapp_number,
      showroom_address,
      instagram,
      google_maps,
      email,
      opening_hours,
    } = body;

    // Validation
    if (!whatsapp_number || !email) {
      return NextResponse.json(
        { message: "WhatsApp number and email are required" },
        { status: 400 },
      );
    }

    const setting = await createSiteSettingRepo({
      whatsapp_number,
      showroom_address: showroom_address || "",
      instagram: instagram || "",
      google_maps: google_maps || "",
      email,
      opening_hours: opening_hours || "",
    });

    return NextResponse.json(setting);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add site settings" },
      { status: 500 },
    );
  }
}
