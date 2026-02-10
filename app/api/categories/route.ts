import { authMiddleware } from "@/app/lib/auth";
import { getCategories } from "@/app/lib/service/categories/get-all-categories.service";
import { createCategory } from "@/app/lib/service/categories/create-categories.service";

export async function GET(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return getCategories(req);
}

export async function POST(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return createCategory(req);
}
