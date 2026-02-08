import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as AuthPayload;
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export function getTokenFromRequest(req: Request): string | null {
  // Try to get token from Authorization header (Bearer token)
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Try to get token from cookies as fallback
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    const authCookie = cookies.find((c) => c.startsWith("authToken="));
    if (authCookie) {
      return authCookie.split("=")[1];
    }
  }

  return null;
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
      response: NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401 },
      ),
    };
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return {
      authorized: false,
      response: NextResponse.json(
        { message: "Unauthorized - Invalid or expired token" },
        { status: 401 },
      ),
    };
  }

  return {
    authorized: true,
    user: decoded,
  };
}
