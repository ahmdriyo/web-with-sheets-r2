import { getAbout } from "@/src/server/service/about/get-about.service";

export async function GET() {
  return getAbout();
}
