import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { clerkConfigured } from "@/lib/env";

const isPublicRoute = createRouteMatcher([
  "/",
  "/templates(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/embed(.*)",
  "/widget.js",
  "/api/chat(.*)",
  "/api/stripe/webhook(.*)",
]);

function nextWithPath(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

const clerk = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  return nextWithPath(req);
});

export default function middleware(
  ...args: Parameters<typeof clerk>
): ReturnType<typeof clerk> {
  if (!clerkConfigured()) {
    return nextWithPath(args[0]);
  }
  return clerk(...args);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
