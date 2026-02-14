import { authMiddleware } from "@/src/server/auth";
import { getAllUserAdmins } from "@/src/server/service/user-admin/get-all-user-admin.service";

export async function GET(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return getAllUserAdmins();
}
