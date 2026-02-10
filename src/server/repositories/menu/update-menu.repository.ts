import { sheetsData } from "../../infra/google.sheets.client";

export async function updateMenuById(
  id: string,
  data: {
    title: string;
    description: string;
    price: string;
    category: string;
    imageUrl?: string;
  },
) {
  const res = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "menu!A2:F",
  });

  const rows = (res.data.values ?? []) as string[][];
  const index = rows.findIndex((r) => r[0] === id);
  if (index === -1) return false;

  const rowNumber = index + 2;

  const current = rows[index];

  await sheetsData.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `menu!A${rowNumber}:F${rowNumber}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          id,
          data.title,
          data.description,
          data.price,
          data.category,
          data.imageUrl ?? current[5],
        ],
      ],
    },
  });

  return true;
}
