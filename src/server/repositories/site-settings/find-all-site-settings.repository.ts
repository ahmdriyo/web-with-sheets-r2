import { SiteSettings } from "@/src/types/site-settings.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findAllSiteSettings() {
  const range = `site-settings!A2:I`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];

  // Get the first row (site settings should be a singleton)
  const firstRow = rows[0];

  if (!firstRow) {
    return null;
  }

  const data: SiteSettings = {
    id: firstRow[0] ?? "",
    whatsapp_number: firstRow[1] ?? "",
    showroom_address: firstRow[2] ?? "",
    instagram: firstRow[3] ?? "",
    google_maps: firstRow[4] ?? "",
    embed_maps: firstRow[5] ?? "",
    email: firstRow[6] ?? "",
    opening_hours: firstRow[7] ?? "",
    created_at: new Date(firstRow[8] ?? Date.now()),
  };

  return data;
}
