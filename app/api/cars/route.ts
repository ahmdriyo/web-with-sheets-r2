import { authMiddleware } from "@/app/lib/auth";
import { getCars } from "@/app/lib/service/cars/get-all-cars.service";
import { createCar } from "@/app/lib/service/cars/create-cars.service";

export async function GET(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return getCars(req);
}

export async function POST(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return createCar(req);
}
