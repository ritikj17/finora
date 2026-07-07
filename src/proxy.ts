import { NextRequest, NextResponse } from "next/server";

/**
 * Edge Middleware - Authentication Guard
 *
 * This runs at the edge (before any server rendering) and protects all
 * /dashboard/* routes. It verifies the session by calling the Better Auth
 * session endpoint. If the session is invalid, the user is redirected to /sign-in.
 *
 * Uses native fetch (Edge-compatible) - no Node.js APIs.
 */
export async function proxy(request: NextRequest) {
  try {
    const baseUrl = request.nextUrl.origin;

    // Fetch the session using native fetch (Edge-compatible)
    const response = await fetch(`${baseUrl}/api/auth/get-session`, {
      headers: {
        // Forward the cookie so Better Auth can validate the session token
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const session = await response.json();

    // If Better Auth returns no session, the user is not authenticated
    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // User is authenticated - allow the request through
    return NextResponse.next();
  } catch (error) {
    // Default to security: redirect on any error
    console.error("[Auth Middleware] Failed to verify session:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// Apply this middleware to all dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
