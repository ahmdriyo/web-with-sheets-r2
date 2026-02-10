import { Menu } from "@/app/types/menu.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findAllMenu(page: number, limit: number) {
  const range = `menu!A2:F`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];

  const totalItems = rows.length;
  const startIndex = (page - 1) * limit;

  const paginatedRows = rows.slice(startIndex, startIndex + limit);

  const data: Menu[] = paginatedRows.map((row) => ({
    id: row[0] ?? "",
    title: row[1] ?? "",
    description: row[2] ?? "",
    price: Number((row[3] ?? "0").replace(/\./g, "")),
    category: row[4] ?? "",
    imageUrl: (row[5] ?? "").split(","),
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
