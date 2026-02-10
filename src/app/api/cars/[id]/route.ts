import { authMiddleware } from "@/src/server/auth";
import { getOneCar } from "@/src/server/service/cars/get-one-cars.service";
import { updateCar } from "@/src/server/service/cars/update-cars.service";
import { deleteCar } from "@/src/server/service/cars/delete-cars.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return getOneCar(id);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return updateCar(id, req);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return deleteCar(id);
}
