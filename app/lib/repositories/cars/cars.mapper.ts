import { Cars } from "@/app/types/cars.type";
import { CARS_COLUMNS } from "./cars.constants";

export function mapRowToCar(row: string[]): Cars {
  return {
    id: row[CARS_COLUMNS.ID] ?? "",
    category: row[CARS_COLUMNS.CATEGORY] ?? "",
    title: row[CARS_COLUMNS.TITLE] ?? "",
    slug: row[CARS_COLUMNS.SLUG] ?? "",
    brand: row[CARS_COLUMNS.BRAND] ?? "",
    model: row[CARS_COLUMNS.MODEL] ?? "",
    year: Number(row[CARS_COLUMNS.YEAR] ?? 0),
    price: Number(row[CARS_COLUMNS.PRICE] ?? 0),
    mileage: Number(row[CARS_COLUMNS.MILEAGE] ?? 0),
    transmission: (row[CARS_COLUMNS.TRANSMISSION] ?? "manual") as
      | "manual"
      | "automatic",
    fuel_type: (row[CARS_COLUMNS.FUEL_TYPE] ?? "bensin") as
      | "bensin"
      | "diesel"
      | "hybrid"
      | "electric",
    condition: (row[CARS_COLUMNS.CONDITION] ?? "used") as "new" | "used",
    seats: Number(row[CARS_COLUMNS.SEATS] ?? 0),
    engine_cc:
      row[CARS_COLUMNS.ENGINE_CC] && row[CARS_COLUMNS.ENGINE_CC] !== ""
        ? Number(row[CARS_COLUMNS.ENGINE_CC])
        : null,
    color: row[CARS_COLUMNS.COLOR] ?? "",
    status: (row[CARS_COLUMNS.STATUS] ?? "available") as
      | "available"
      | "sold"
      | "booked",
    is_featured: row[CARS_COLUMNS.IS_FEATURED] === "true",
    primary_image_url: row[CARS_COLUMNS.PRIMARY_IMAGE_URL] ?? "",
    image_urls: row[CARS_COLUMNS.IMAGE_URLS]
      ? row[CARS_COLUMNS.IMAGE_URLS].split(",").map((url) => url.trim())
      : [],
    description: row[CARS_COLUMNS.DESCRIPTION] ?? "",
    created_at: new Date(row[CARS_COLUMNS.CREATED_AT] ?? Date.now()),
  };
}

export function mapCarToRow(car: {
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
}): string[] {
  return [
    car.id,
    car.category,
    car.title,
    car.slug,
    car.brand,
    car.model,
    String(car.year),
    String(car.price),
    String(car.mileage),
    car.transmission,
    car.fuel_type,
    car.condition,
    String(car.seats),
    car.engine_cc !== null ? String(car.engine_cc) : "",
    car.color,
    car.status,
    String(car.is_featured),
    car.primary_image_url,
    car.image_urls.join(","),
    car.description,
    car.created_at,
  ];
}
