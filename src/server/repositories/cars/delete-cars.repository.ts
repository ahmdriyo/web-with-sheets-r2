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

  // Actual row number in the sheet (add 2 because: 1 for header, 1 for 0-based index)
  const actualRowNumber = rowIndex + 2;

  // Get the sheet ID first
  const spreadsheet = await sheetsData.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
  });

  const sheet = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === CARS_SHEET_NAME,
  );

  if (!sheet?.properties?.sheetId) {
    throw new Error("Sheet not found");
  }

  // Delete the entire row using batchUpdate
  await sheetsData.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: sheet.properties.sheetId,
              dimension: "ROWS",
              startIndex: actualRowNumber - 1, // 0-based index
              endIndex: actualRowNumber, // exclusive, so this deletes just one row
            },
          },
        },
      ],
    },
  });

  return {
    message: "Car deleted successfully!",
  };
}
