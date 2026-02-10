import { sheetsData } from "../../infra/google.sheets.client";

export async function updateSiteSetting(
  id: string,
  data: {
    whatsapp_number?: string;
    showroom_address?: string;
    instagram?: string;
    google_maps?: string;
    email?: string;
    opening_hours?: string;
  },
) {
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
  const existingRow = rows[rowIndex];

  const updatedData = {
    id,
    whatsapp_number: data.whatsapp_number ?? existingRow[1],
    showroom_address: data.showroom_address ?? existingRow[2],
    instagram: data.instagram ?? existingRow[3],
    google_maps: data.google_maps ?? existingRow[4],
    email: data.email ?? existingRow[5],
    opening_hours: data.opening_hours ?? existingRow[6],
    created_at: existingRow[7],
  };

  await sheetsData.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `site-settings!A${actualRowNumber}:H${actualRowNumber}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          updatedData.id,
          updatedData.whatsapp_number,
          updatedData.showroom_address,
          updatedData.instagram,
          updatedData.google_maps,
          updatedData.email,
          updatedData.opening_hours,
          updatedData.created_at,
        ],
      ],
    },
  });

  return {
    message: "Site settings updated!",
    ...updatedData,
  };
}
