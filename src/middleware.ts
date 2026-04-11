import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { id: string; role: string; username: string };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const payload = token ? await verifyToken(token) : null;
  const { pathname } = request.nextUrl;

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && payload.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/laporan", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/laporan/buat",
    // // "/laporan/:path*",
    // "/admin/:path*",
  ],
};
