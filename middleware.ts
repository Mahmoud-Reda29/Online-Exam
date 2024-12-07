import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Request URL:", req.nextUrl.pathname);

  const token = req.cookies.get("next-auth.session-token")?.value;
  console.log("Token found:", token);

  const restrictedRoutes = ["/signin", "/signup"];
  const protectedRoutes = ["/home"];

  const pathname = req.nextUrl.pathname;

  // User is logged in and accessing restricted routes
  if (token && restrictedRoutes.includes(pathname)) {
    console.log("Redirecting logged-in user away from restricted route:", pathname);
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // User is not logged in and accessing protected routes
  if (!token && protectedRoutes.includes(pathname)) {
    console.log("Redirecting guest user away from protected route:", pathname);
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // Redirect "/" to "/signin"
  if (!token && pathname === "/") {
    alert("Redirecting from '/' to '/signin'");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  console.log("Allowing request:", pathname);
  return NextResponse.next();
}

export const config = {
    matcher: ["/", "/home", "/signin", "/signup"], // Include all relevant routes
  };
  