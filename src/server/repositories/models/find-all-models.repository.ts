import { Model } from "@/src/types/model.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findAllModels(page: number, limit: number) {
  const range = `models!A2:F`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];

  const totalItems = rows.length;
  const startIndex = (page - 1) * limit;

  const paginatedRows = rows.slice(startIndex, startIndex + limit);

  const data: Model[] = paginatedRows.map((row) => ({
    id: row[0] ?? "",
    id_brand: row[1] ?? "",
    id_category: row[2] || undefined,
    name: row[3] ?? "",
    created_at: new Date(row[4] ?? Date.now()),
    updated_at: new Date(row[5] ?? Date.now()),
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
