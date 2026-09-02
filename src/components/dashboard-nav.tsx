"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/dashboard", label: "FAQ" },
  { href: "/dashboard/settings", label: "Widget" },
  { href: "/dashboard/billing", label: "Billing" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <header className="dash-nav">
      <Link className="nav-brand" href="/dashboard">
        Nebula
      </Link>
      <nav className="dash-links">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <UserButton />
    </header>
  );
}
