// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    // Construct the absolute URL to our API route
    const baseUrl = request.nextUrl.origin;
    
    // Fetch the session using native fetch (Edge compatible)
    const response = await fetch(`${baseUrl}/api/auth/get-session`, {
      headers: {
        // We must manually pass the cookie to the server
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const session = await response.json();

    // If Better Auth returns no session data, the user is not logged in
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // User is authenticated, allow them into the dashboard
    return NextResponse.next();
  } catch (error) {
    // If the internal fetch fails for any reason, default to security (redirect)
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// Specify exactly which routes this proxy should protect
export const config = {
  matcher: ["/dashboard/:path*"],
};
