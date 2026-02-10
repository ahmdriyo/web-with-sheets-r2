import { authMiddleware } from "@/app/lib/auth";
import { getOneCar } from "@/app/lib/service/cars/get-one-cars.service";
import { updateCar } from "@/app/lib/service/cars/update-cars.service";
import { deleteCar } from "@/app/lib/service/cars/delete-cars.service";

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
