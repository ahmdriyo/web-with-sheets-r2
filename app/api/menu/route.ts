import { authMiddleware } from "@/app/lib/auth";
import { getMenus } from "@/app/lib/service/menu/get-all-menu.service";
import { createMenu } from "@/app/lib/service/menu/create-menu.service";

export async function GET(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return getMenus(req);
}

export async function POST(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return createMenu(req);
}
