import { NextResponse } from "next/server";
import { verifyToken, AuthPayload } from "./jwt";

export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const authCookie = cookies.find((c) => c.startsWith("accessToken="));

  return authCookie?.split("=")[1] ?? null;
}

export function authMiddleware(req: Request): {
  authorized: boolean;
  user?: AuthPayload;
  response?: NextResponse;
} {
  const token = getTokenFromRequest(req);

  if (!token) {
    return {
      authorized: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return {
      authorized: false,
      response: NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 },
      ),
    };
  }

  return { authorized: true, user: decoded };
}
