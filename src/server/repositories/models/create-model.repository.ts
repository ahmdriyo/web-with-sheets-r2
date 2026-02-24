import { sheetsData } from "../../infra/google.sheets.client";

export async function createModel(data: {
  name: string;
  id_brand: string;
  id_category?: string;
}) {
  const id = `MDL-${Date.now()}`;
  const now = new Date().toISOString();

  await sheetsData.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "models!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [id, data.id_brand, data.id_category || "", data.name, now, now],
      ],
    },
  });

  return {
    message: "Model added!",
    id,
    id_brand: data.id_brand,
    id_category: data.id_category,
    name: data.name,
    created_at: now,
    updated_at: now,
  };
}
