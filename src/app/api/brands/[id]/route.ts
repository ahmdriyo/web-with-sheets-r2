import { authMiddleware } from "@/src/server/auth";
import { deleteBrand } from "@/src/server/service/brands/delete-brand.service";
import { getOneBrand } from "@/src/server/service/brands/get-one-brand.service";
import { updateBrand } from "@/src/server/service/brands/update-brand.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return getOneBrand(id);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return updateBrand(id, req);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return deleteBrand(id);
}
