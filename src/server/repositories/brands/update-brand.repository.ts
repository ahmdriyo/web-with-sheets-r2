import { sheetsData } from "../../infra/google.sheets.client";

export async function updateBrand(id: string, data: { name: string }) {
  const range = `brands!A2:D`;

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
  const created_at = rows[rowIndex][2];

  await sheetsData.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `brands!A${actualRowNumber}:D${actualRowNumber}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[id, data.name, created_at, now]],
    },
  });

  return {
    message: "Brand updated!",
    id,
    name: data.name,
    created_at,
    updated_at: now,
  };
}
