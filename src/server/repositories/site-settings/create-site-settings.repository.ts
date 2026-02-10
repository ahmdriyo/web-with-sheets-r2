import { sheetsData } from "../../infra/google.sheets.client";

export async function createSiteSetting(data: {
  whatsapp_number: string;
  showroom_address: string;
  instagram: string;
  google_maps: string;
  email: string;
  opening_hours: string;
}) {
  const id = `SITE-${Date.now()}`;
  const now = new Date().toISOString();

  await sheetsData.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "site-settings!A:H",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          id,
          data.whatsapp_number,
          data.showroom_address,
          data.instagram,
          data.google_maps,
          data.email,
          data.opening_hours,
          now,
        ],
      ],
    },
  });

  return {
    message: "Site settings added!",
    id,
    ...data,
    created_at: now,
  };
}
