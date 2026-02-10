import { sheetsData } from "../../infra/google.sheets.client";

export async function deleteSiteSetting(id: string) {
  const range = `site-settings!A2:H`;

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

  await sheetsData.spreadsheets.values.clear({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `site-settings!A${actualRowNumber}:H${actualRowNumber}`,
  });

  return {
    message: "Site settings deleted!",
  };
}
