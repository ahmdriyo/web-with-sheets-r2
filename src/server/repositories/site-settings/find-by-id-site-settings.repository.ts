import { SiteSettings } from "@/src/types/site-settings.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findSiteSettingById(id: string) {
  const range = `site-settings!A2:H`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];
  const settingRow = rows.find((row) => row[0] === id);

  if (!settingRow) {
    return null;
  }

  const data: SiteSettings = {
    id: settingRow[0] ?? "",
    whatsapp_number: settingRow[1] ?? "",
    showroom_address: settingRow[2] ?? "",
    instagram: settingRow[3] ?? "",
    google_maps: settingRow[4] ?? "",
    email: settingRow[5] ?? "",
    opening_hours: settingRow[6] ?? "",
    created_at: new Date(settingRow[7] ?? Date.now()),
  };

  return data;
}
