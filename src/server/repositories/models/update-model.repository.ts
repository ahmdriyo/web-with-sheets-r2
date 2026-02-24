import { sheetsData } from "../../infra/google.sheets.client";

export async function updateModel(
  id: string,
  data: { name: string; id_brand: string; id_category?: string },
) {
  const range = `models!A2:F`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];
  const rowIndex = rows.findIndex((row) => row[0] === id);

  if (rowIndex === -1) {
    return null;
  }

  const actualRowNumber = rowIndex + 2;
  const now = new Date().toISOString();
  const created_at = rows[rowIndex][4];

  await sheetsData.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `models!A${actualRowNumber}:F${actualRowNumber}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [id, data.id_brand, data.id_category || "", data.name, created_at, now],
      ],
    },
  });

  return {
    message: "Model updated!",
    id,
    id_brand: data.id_brand,
    id_category: data.id_category,
    name: data.name,
    created_at,
    updated_at: now,
  };
}
