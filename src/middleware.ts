import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkConfigured } from "@/lib/env";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/embed(.*)",
  "/widget.js",
  "/api/chat(.*)",
  "/api/stripe/webhook(.*)",
]);

const clerk = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export default function middleware(
  ...args: Parameters<typeof clerk>
): ReturnType<typeof clerk> | NextResponse {
  if (!clerkConfigured()) {
    return NextResponse.next();
  }
  return clerk(...args);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
