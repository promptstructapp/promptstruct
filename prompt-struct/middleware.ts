// middleware.ts (lives at the root of the project, next to package.json)
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // --- API routes: return JSON 401, never redirect ---
  // A redirect returns an HTML page which breaks fetch() callers
  if (
    pathname.startsWith("/api/parse") ||
    pathname.startsWith("/api/user/usage")
  ) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }
    return NextResponse.next();
  }

  // --- Page routes: redirect to home if not authenticated ---
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/parse", "/api/user/usage"],
};
