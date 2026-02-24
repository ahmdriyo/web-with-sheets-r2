import { Model } from "@/src/types/model.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findModelById(id: string) {
  const range = `models!A2:F`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];
  const modelRow = rows.find((row) => row[0] === id);

  if (!modelRow) {
    return null;
  }

  const data: Model = {
    id: modelRow[0] ?? "",
    id_brand: modelRow[1] ?? "",
    id_category: modelRow[2] || undefined,
    name: modelRow[3] ?? "",
    created_at: new Date(modelRow[4] ?? Date.now()),
    updated_at: new Date(modelRow[5] ?? Date.now()),
  };
  return data;
}
