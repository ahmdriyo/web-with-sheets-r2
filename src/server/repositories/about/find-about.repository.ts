import { sheetsData } from "../../infra/google.sheets.client";
import { About } from "@/src/types/about.type";

export async function findAbout() {
  const range = `about!A2:H`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];

  // Get the first row (about should be a singleton)
  const firstRow = rows[0];

  if (!firstRow) {
    return null;
  }

  const data: About = {
    id: firstRow[0] ?? "",
    title: firstRow[1] ?? "",
    description: firstRow[2] ?? "",
    ourMission: firstRow[3] ?? "",
    ourVision: firstRow[4] ?? "",
    carsSold: firstRow[5] ?? "",
    happyCustomers: firstRow[6] ?? "",
    yearsExperience: firstRow[7] ?? "",
  };

  return data;
}
