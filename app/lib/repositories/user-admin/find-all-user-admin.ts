import { User } from "@/app/types/user.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findAllUserAdmin() {
  const range = `user-admins!A2:C`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];

  const data: User[] = rows.map((row) => ({
    name: row[0] ?? "",
    username: row[1] ?? "",
    password: row[2] ?? "",
  }));

  return data;
}
