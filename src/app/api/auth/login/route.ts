import { loginUser } from "@/src/server/service/auth/login.service";

export async function POST(req: Request) {
  return loginUser(req);
}
