import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ROLE_PATHS } from "./lib/constants";

function canAccessPath(roles: string[], pathname: string): boolean {
  // Check if any of user's roles allows this path
  for (const role of roles) {
    const allowedPaths = ROLE_PATHS[role] || [];
    for (const path of allowedPaths) {
      if (pathname === path || pathname.startsWith(path + "/")) {
        return true;
      }
    }
  }
  return false;
}

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;

    // Public routes - always allow
    if (path === "/login" || path === "/unauthorized") {
      return NextResponse.next();
    }

    // Dashboard root - allow authenticated users
    if (path === "/dashboard") {
      const response = NextResponse.next();
      // Add no-cache headers to prevent browser caching
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      return response;
    }

    // Check role-based access for subpaths
    const roles = (req.nextauth.token as any)?.roles || [];
    const hasAccess = canAccessPath(roles, path);

    if (!hasAccess) {
      // Redirect to unauthorized instead of login
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Add no-cache headers to all protected routes
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"], // protect dashboard & its children
};
