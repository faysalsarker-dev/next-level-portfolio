import { fetchWithTag } from "@/lib/fetchWithTag";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/dashboard/blogs", "/dashboard/projects"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
      const res = await fetchWithTag(`/user/me`, {
       headers: {
          Cookie: `accessToken=${token}`, 
        },
        tag: "auth"
      });
      if (!res.success) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.log(error,'error');
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
