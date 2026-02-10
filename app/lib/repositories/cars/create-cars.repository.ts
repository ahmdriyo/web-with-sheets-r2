import { sheetsData } from "../../infra/google.sheets.client";
import { CARS_SHEET_NAME } from "./cars.constants";
import { mapCarToRow } from "./cars.mapper";

export async function createCar(data: {
  id: string;
  category: string;
  title: string;
  slug: string;
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
  created_at: string;
}) {
  const row = mapCarToRow(data);

  await sheetsData.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `${CARS_SHEET_NAME}!A:U`,
    valueInputOption: "RAW",
    requestBody: {
      values: [row],
    },
  });

  return {
    message: "Car added successfully!",
    id: data.id,
  };
}
