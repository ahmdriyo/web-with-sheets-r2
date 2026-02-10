import { loginUser } from "@/app/lib/service/auth/login.service";

export async function POST(req: Request) {
  return loginUser(req);
}
