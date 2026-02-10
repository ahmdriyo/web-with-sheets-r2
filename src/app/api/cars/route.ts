import { authMiddleware } from "@/src/server/auth";
import { getCars } from "@/src/server/service/cars/get-all-cars.service";
import { createCar } from "@/src/server/service/cars/create-cars.service";

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
