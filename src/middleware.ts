import { getUrl } from "@/lib/get-url";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const pathname = request.nextUrl.pathname;

  const baseUrl = request.nextUrl.origin

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL(getUrl("/app/dashboard"), baseUrl));
  }

  if (pathname.includes("/app") && !token) {
    return NextResponse.redirect(new URL(getUrl("/auth/sign-in"), baseUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};