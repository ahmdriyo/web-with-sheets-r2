import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "./utils/action";

// Protected admin routes that require authentication
const protectedAdminRoutes = [
  "/admin-showroom/categories",
  "/admin-showroom/cars",
  "/admin-showroom/site-settings",
  "/admin-showroom/profile",
];

const publicAdminRoutes = ["/admin-showroom/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedAdminRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicRoute = publicAdminRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, verify authentication
  if (isProtectedRoute) {
    const accessToken = await getToken();
    if (accessToken === null) {
      const loginUrl = new URL("/admin-showroom/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-showroom/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
