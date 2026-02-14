import { SiteSettings } from "@/src/types/site-settings.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findAllSiteSettings(page: number, limit: number) {
  const range = `site-settings!A2:H`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];

  const totalItems = rows.length;
  const startIndex = (page - 1) * limit;

  const paginatedRows = rows.slice(startIndex, startIndex + limit);

  const data: SiteSettings[] = paginatedRows.map((row) => ({
    id: row[0] ?? "",
    whatsapp_number: row[1] ?? "",
    showroom_address: row[2] ?? "",
    instagram: row[3] ?? "",
    google_maps: row[4] ?? "",
    email: row[5] ?? "",
    opening_hours: row[6] ?? "",
    created_at: new Date(row[7] ?? Date.now()),
  }));

  return {
    data,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}
