import { sheetsData } from "../../infra/google.sheets.client";
import { CARS_RANGE, CARS_SHEET_NAME } from "./cars.constants";
import { mapCarToRow } from "./cars.mapper";

export async function updateCar(
  id: string,
  data: {
    category: string;
    title: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    transmission: string;
    fuel_type: string;
    condition: string;
    seats: number;
    engine_cc: number | null;
    color: string;
    status: string;
    is_featured: boolean;
    primary_image_url: string;
    image_urls: string[];
    description: string;
    slug: string;
    created_at: string;
  },
) {
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

  const row = mapCarToRow({
    id,
    ...data,
  });

  await sheetsData.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `${CARS_SHEET_NAME}!A${actualRowNumber}:U${actualRowNumber}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [row],
    },
  });

  return {
    message: "Car updated successfully!",
    id,
  };
}
