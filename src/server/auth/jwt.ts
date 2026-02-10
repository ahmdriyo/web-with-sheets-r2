import jwt from "jsonwebtoken";

export interface AuthPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!) as AuthPayload;
  } catch {
    return null;
  }
}
