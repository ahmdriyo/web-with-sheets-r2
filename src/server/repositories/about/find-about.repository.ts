import { sheetsData } from "../../infra/google.sheets.client";
import { About } from "@/src/types/about.type";

export async function findAbout(page: number, limit: number) {
  const range = `about!A2:H`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];

  const totalItems = rows.length;
  const startIndex = (page - 1) * limit;

  const paginatedRows = rows.slice(startIndex, startIndex + limit);

  const data: About[] = paginatedRows.map((row) => ({
    id: row[0] ?? "",
    title: row[1] ?? "",
    description: row[2] ?? "",
    ourMission: row[3] ?? "",
    ourVision: row[4] ?? "",
    carsSold: row[5] ?? "",
    happyCustomers: row[6] ?? "",
    yearsExperience: row[7] ?? "",
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
