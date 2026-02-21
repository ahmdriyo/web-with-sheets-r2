import { UpdateSiteSettingsDTO } from "@/src/types/site-settings.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function updateSiteSetting(
  id: string,
  data: UpdateSiteSettingsDTO,
) {
  const range = `site-settings!A2:I`;

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
    embed_maps: data.embed_maps ?? existingRow[5],
    email: data.email ?? existingRow[6],
    opening_hours: data.opening_hours ?? existingRow[7],
    created_at: existingRow[8],
  };

  await sheetsData.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `site-settings!A${actualRowNumber}:I${actualRowNumber}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          updatedData.whatsapp_number,
          updatedData.showroom_address,
          updatedData.instagram,
          updatedData.google_maps,
          updatedData.embed_maps,
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
