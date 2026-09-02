import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { clerkConfigured } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nebula — FAQ chatbot for your site",
  description:
    "Add your FAQs, paste a script tag, and let a chatbot answer from your own content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const inner = (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );

  if (!clerkConfigured()) {
    return inner;
  }

  return (
    <ClerkProvider>
      {inner}
    </ClerkProvider>
  );
}
