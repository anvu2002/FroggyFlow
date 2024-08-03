import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const path = req.nextUrl.pathname;

    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const publicPaths = path === "/" || path === "/register" || path === "/login" || path === "/landing";

    if (path === "/") {
        return NextResponse.redirect(new URL("/landing", req.nextUrl));
    }

    if (publicPaths && token) {
        return NextResponse.redirect(new URL("/profile", req.nextUrl));
    }

    // if (!publicPaths && !token) {
    //     return NextResponse.redirect(new URL("/landing", req.nextUrl));
    // }
}

export const config = {
    matcher: ["/", "/register", "/login", "/explore", "/landing", "/profile", "/pendingConnects", "/connects", "/chat"],
};

// FOR MAINTENANCE BREAKS
// import { NextResponse } from 'next/server';
// import { getToken } from "next-auth/jwt";

// export async function middleware(req) {
//     const path = req.nextUrl.pathname;

//     // Paths that should not be redirected to /maintenance
//     const allowList = [
//         '/maintenance', 
//         '/api/auth/session', 
//         '/api/auth/callback', 
//         '/api/auth/signin', 
//         '/api/auth/signout', 
//         '/api/auth/providers',
//         '/_next',
//         '/static',
//         '/favicon.ico'
//     ];

//     const isAllowed = allowList.some((allowedPath) => path.startsWith(allowedPath));

//     if (!isAllowed) {
//         return NextResponse.redirect(new URL('/maintenance', req.nextUrl));
//     }

// }

// export const config = {
//     matcher: [
//         '/:path*'
//     ],
// };