import { sheetsData } from "../../infra/google.sheets.client";

export async function findMenuById(id: string) {
  const res = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "menu!A2:F",
  });

  const rows = (res.data.values ?? []) as string[][];

  const row = rows.find((r) => r[0] === id);
  if (!row) return null;

  return {
    id: row[0],
    title: row[1],
    description: row[2],
    price: Number(row[3] ?? 0),
    category: row[4],
    imageUrl: (row[5] ?? "").split(","),
  };
}
