import { Brand } from "@/src/types/brand.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findAllBrands(page: number, limit: number) {
  const range = `brands!A2:D`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];

  const totalItems = rows.length;
  const startIndex = (page - 1) * limit;

  const paginatedRows = rows.slice(startIndex, startIndex + limit);

  const data: Brand[] = paginatedRows.map((row) => ({
    id: row[0] ?? "",
    name: row[1] ?? "",
    created_at: new Date(row[2] ?? Date.now()),
    updated_at: new Date(row[3] ?? Date.now()),
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
