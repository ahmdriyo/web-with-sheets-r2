import { authMiddleware } from "@/app/lib/auth";
import { getOneCategory } from "@/app/lib/service/categories/get-one-categories.service";
import { updateCategory } from "@/app/lib/service/categories/update-categories.service";
import { deleteCategory } from "@/app/lib/service/categories/delete-categories.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return getOneCategory(id);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return updateCategory(id, req);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return deleteCategory(id);
}
