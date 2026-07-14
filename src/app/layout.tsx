import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nebula — Spatial Visual Search",
  description: "Explore visual inspiration as a living, physics-driven graph.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
