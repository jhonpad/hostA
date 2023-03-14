import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  // const pathname = request.nextUrl.pathname;

  // // if (requireAuth.some((path) => pathname.startsWith(path))) {
  //   const token = await getToken({
  //     req: request,
  //     secret: process.env.NEXTAUTH_SECRET,
  //   });
  //   console.log('Middleware - token -> ', token ) 

  //   //check not logged in
  //   if (!token) {
  //     const url = new URL(`/api/auth/signin`, request.url);
  //     url.searchParams.set("callbackUrl", encodeURI(request.url));
  //     return NextResponse.redirect(url);
  //   }

  //   //check if not authorized
  //   if (token.role !== "admin") {
  //     const url = new URL(`/403`, request.url);
  //     return NextResponse.rewrite(url);
  //   }

  // }
  return res;
}