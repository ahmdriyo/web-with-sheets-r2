import { authMiddleware } from "@/src/server/auth";
import { getBrands } from "@/src/server/service/brands/get-all-brands.service";
import { createBrand } from "@/src/server/service/brands/create-brand.service";

export async function GET(req: Request) {
  return getBrands(req);
}

export async function POST(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return createBrand(req);
}
