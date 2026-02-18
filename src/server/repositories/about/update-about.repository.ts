import { sheetsData } from "../../infra/google.sheets.client";

export async function updateAbout(
  id: string,
  data: {
    title: string;
    description: string;
    ourMission: string;
    ourVision: string;
    carsSold: string;
    happyCustomers: string;
    yearsExperience: string;
  },
) {
  const range = `about!A2:H`;

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
    range: `about!A${actualRowNumber}:H${actualRowNumber}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          id,
          data.title,
          data.description,
          data.ourMission,
          data.ourVision,
          data.carsSold,
          data.happyCustomers,
          data.yearsExperience,
        ],
      ],
    },
  });

  return {
    message: "About updated!",
    id,
    title: data.title,
    description: data.description,
    ourMission: data.ourMission,
    ourVision: data.ourVision,
    carsSold: data.carsSold,
    happyCustomers: data.happyCustomers,
    yearsExperience: data.yearsExperience,
    created_at,
    updated_at: now,
  };
}
