import { authMiddleware } from "@/src/server/auth";
import { getOneSiteSetting } from "@/src/server/service/site-settings/get-one-site-settings.service";
import { updateSiteSetting } from "@/src/server/service/site-settings/update-site-settings.service";
import { deleteSiteSetting } from "@/src/server/service/site-settings/delete-site-settings.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return getOneSiteSetting(id);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return updateSiteSetting(id, req);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return deleteSiteSetting(id);
}
