import { sheetsData } from "../../infra/google.sheets.client";

export async function createMenu(data: {
  title: string;
  description: string;
  price: string;
  category: string;
  imageUrls: string[];
}) {
  const id = `MNU-${Date.now()}`;

  await sheetsData.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "menu!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          id,
          data.title,
          data.description,
          data.price,
          data.category,
          data.imageUrls.join(","),
        ],
      ],
    },
  });

  return {
    message: "Menu added!",
    id,
    imageUrls: data.imageUrls,
  };
}
