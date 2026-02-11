import { authMiddleware } from "@/src/server/auth";
import { getSiteSettings } from "@/src/server/service/site-settings/get-all-site-settings.service";
import { createSiteSetting } from "@/src/server/service/site-settings/create-site-settings.service";

export async function GET(req: Request) {
  return getSiteSettings(req);
}

export async function POST(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return createSiteSetting(req);
}
