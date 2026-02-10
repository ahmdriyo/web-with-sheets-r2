import { sheetsData } from "../../infra/google.sheets.client";

export async function createCategory(data: { name: string }) {
  const id = `CAT-${Date.now()}`;
  const now = new Date().toISOString();

  await sheetsData.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "categories!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[id, data.name, now, now]],
    },
  });

  return {
    message: "Category added!",
    id,
    name: data.name,
    created_at: now,
    updated_at: now,
  };
}
