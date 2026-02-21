import { authMiddleware } from "@/src/server/auth";
import { updateAbout } from "@/src/server/service/about/update-about.service";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  return updateAbout(id, req);
}
