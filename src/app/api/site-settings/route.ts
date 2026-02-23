import { authMiddleware } from "@/src/server/auth";
import { getSiteSettings } from "@/src/server/service/site-settings/get-all-site-settings.service";
import { updateSiteSetting } from "@/src/server/service/site-settings/update-site-settings.service";

export async function GET() {
  return getSiteSettings();
}

export async function PUT(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return updateSiteSetting(req);
}
