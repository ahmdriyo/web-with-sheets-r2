import { authMiddleware } from "@/src/server/auth";
import { getCategories } from "@/src/server/service/categories/get-all-categories.service";
import { createCategory } from "@/src/server/service/categories/create-category.service";

export async function GET(req: Request) {
  return getCategories(req);
}

export async function POST(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return createCategory(req);
}
