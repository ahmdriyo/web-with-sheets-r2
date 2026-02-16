import { Categories } from "@/src/types/categories.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findCategoryById(id: string) {
  const range = `categories!A2:D`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];
  const categoryRow = rows.find((row) => row[0] === id);

  if (!categoryRow) {
    return null;
  }

  const data: Categories = {
    id: categoryRow[0] ?? "",
    name: categoryRow[1] ?? "",
    created_at: new Date(categoryRow[2] ?? Date.now()),
    updated_at: new Date(categoryRow[3] ?? Date.now()),
  };
  return data;
}
