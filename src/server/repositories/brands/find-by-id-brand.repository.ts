import { Brand } from "@/src/types/brand.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findBrandById(id: string) {
  const range = `brands!A2:D`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];
  const brandRow = rows.find((row) => row[0] === id);

  if (!brandRow) {
    return null;
  }

  const data: Brand = {
    id: brandRow[0] ?? "",
    name: brandRow[1] ?? "",
    created_at: new Date(brandRow[2] ?? Date.now()),
    updated_at: new Date(brandRow[3] ?? Date.now()),
  };
  return data;
}
