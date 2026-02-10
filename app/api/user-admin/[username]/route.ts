import { authMiddleware } from "@/app/lib/auth";
import { getUserAdminByUsername } from "@/app/lib/service/user-admin/get-by-username-user-admin.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  const { username } = await params;
  return getUserAdminByUsername(username);
}
