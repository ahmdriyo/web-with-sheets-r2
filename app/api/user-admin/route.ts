import { authMiddleware } from "@/app/lib/auth";
import { getAllUserAdmins } from "@/app/lib/service/user-admin/get-all-user-admin.service";

export async function GET(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return getAllUserAdmins();
}
