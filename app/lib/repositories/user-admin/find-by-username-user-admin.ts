import { User } from "@/app/types/user.type";
import { sheetsData } from "../../infra/google.sheets.client";

export async function findUserAdminByUsername(username: string) {
  const range = `user-admins!A2:C`;

  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = (response.data.values ?? []) as string[][];

  const user = rows.find((row) => row[1] === username);

  if (!user) {
    return null;
  }

  const data: User = {
    name: user[0] ?? "",
    username: user[1] ?? "",
    password: user[2] ?? "",
  };

  return data;
}
