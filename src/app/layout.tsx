import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { clerkConfigured } from "@/lib/env";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nebula — FAQ chatbot for your site",
  description:
    "Add your FAQs, paste a script tag, and let a chatbot answer from your own content.",
};

const clerkAppearance = {
  variables: {
    colorBackground: "var(--color-surface)",
    colorPrimary: "var(--color-accent)",
    colorText: "var(--color-text)",
    colorTextSecondary: "var(--color-text)",
    colorInputBackground: "var(--color-bg)",
    colorInputText: "var(--color-text)",
    colorNeutral: "var(--color-text)",
    borderRadius: "8px",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = (await headers()).get("x-pathname") ?? "";
  const lang = path.startsWith("/templates") ? "de" : "en";

  const inner = (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );

  if (!clerkConfigured()) {
    return inner;
  }

  return <ClerkProvider appearance={clerkAppearance}>{inner}</ClerkProvider>;
}
