import { CreateSiteSettingsDTO } from "@/src/types/site-settings.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function createSiteSetting(data: CreateSiteSettingsDTO) {
  const id = `SITE-${Date.now()}`;
  const now = new Date().toISOString();

  await sheetsData.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "site-settings!A:I",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          id,
          data.whatsapp_number,
          data.showroom_address,
          data.instagram,
          data.google_maps,
          data.embed_maps,
          data.email,
          data.opening_hours,
          now,
        ],
      ],
    },
  });

  return {
    message: "Site settings added!",
    id,
    ...data,
    created_at: now,
  };
}
