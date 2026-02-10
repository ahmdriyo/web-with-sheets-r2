import { sheetsData } from "../../infra/google.sheets.client";

export async function deleteMenuById(id: string) {
  const res = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "menu!A2:F",
  });

  const rows = (res.data.values ?? []) as string[][];
  const index = rows.findIndex((r) => r[0] === id);
  if (index === -1) return false;

  await sheetsData.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 0,
              dimension: "ROWS",
              startIndex: index + 1,
              endIndex: index + 2,
            },
          },
        },
      ],
    },
  });

  return true;
}
