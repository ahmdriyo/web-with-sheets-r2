import { sheetsData } from "../../infra/google.sheets.client";

export async function createBrand(data: { name: string }) {
  const id = `BRD-${Date.now()}`;
  const now = new Date().toISOString();

  await sheetsData.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "brands!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[id, data.name, now, now]],
    },
  });

  return {
    message: "Brand added!",
    id,
    name: data.name,
    created_at: now,
    updated_at: now,
  };
}
