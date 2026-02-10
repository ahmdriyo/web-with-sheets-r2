import { Cars } from "@/src/types/cars.type";
import { sheetsData } from "../../infra/google.sheets.client";
import { CARS_RANGE } from "./cars.constants";
import { mapRowToCar } from "./cars.mapper";

export async function findCarById(id: string): Promise<Cars | null> {
  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: CARS_RANGE,
  });

  const rows = (response.data.values ?? []) as string[][];
  const carRow = rows.find((row) => row[0] === id);

  if (!carRow) {
    return null;
  }

  return mapRowToCar(carRow);
}
