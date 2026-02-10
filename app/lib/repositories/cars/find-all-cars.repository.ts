import { CarsListDTO } from "@/app/types/cars.type";
import { sheetsData } from "../../infra/google.sheets.client";
import { CARS_RANGE } from "./cars.constants";
import { mapRowToCar } from "./cars.mapper";

export async function findAllCars(page: number, limit: number) {
  const response = await sheetsData.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: CARS_RANGE,
  });

  const rows = (response.data.values ?? []) as string[][];

  const totalItems = rows.length;
  const startIndex = (page - 1) * limit;

  const paginatedRows = rows.slice(startIndex, startIndex + limit);

  const data: CarsListDTO[] = paginatedRows.map((row) => {
    const car = mapRowToCar(row);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, ...carWithoutDescription } = car;
    return carWithoutDescription;
  });

  return {
    data,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}
