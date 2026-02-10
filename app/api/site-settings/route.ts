import { authMiddleware } from "@/app/lib/auth";
import { getSiteSettings } from "@/app/lib/service/site-settings/get-all-site-settings.service";
import { createSiteSetting } from "@/app/lib/service/site-settings/create-site-settings.service";

export async function GET(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return getSiteSettings(req);
}

export async function POST(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return createSiteSetting(req);
}
