import { authMiddleware } from "@/app/lib/auth";
import { deleteMenuById } from "@/app/lib/service/menu/delete-menu.service";
import { getMenuById } from "@/app/lib/service/menu/get-one-menu.service";
import { updateMenuById } from "@/app/lib/service/menu/update-menu.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return getMenuById(id);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return updateMenuById(req, id);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return deleteMenuById(id);
}
