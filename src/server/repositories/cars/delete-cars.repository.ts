import { sheetsData } from "../../infra/google.sheets.client";
import { CARS_RANGE, CARS_SHEET_NAME } from "./cars.constants";

export async function deleteCar(id: string) {
  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: CARS_RANGE,
  });

  const rows = (response.data.values ?? []) as string[][];
  const rowIndex = rows.findIndex((row) => row[0] === id);

  if (rowIndex === -1) {
    return null;
  }

  const actualRowNumber = rowIndex + 2;

  await sheetsData.spreadsheets.values.clear({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `${CARS_SHEET_NAME}!A${actualRowNumber}:U${actualRowNumber}`,
  });

  return {
    message: "Car deleted successfully!",
  };
}
