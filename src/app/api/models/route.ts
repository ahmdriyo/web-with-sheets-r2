import { authMiddleware } from "@/src/server/auth";
import { getModels } from "@/src/server/service/models/get-all-models.service";
import { createModel } from "@/src/server/service/models/create-model.service";

export async function GET(req: Request) {
  return getModels(req);
}

export async function POST(req: Request) {
  const auth = authMiddleware(req);
  if (!auth.authorized) return auth.response!;

  return createModel(req);
}
