import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { clerkConfigured } from "@/lib/env";

export default function SignUpPage() {
  if (!clerkConfigured()) {
    return (
      <main className="auth-screen">
        <div className="auth-toolbar">
          <Link className="nav-brand" href="/">
            Nebula
          </Link>
          <ThemeToggle />
        </div>
        <div className="auth-body">
          <p>Set Clerk keys in .env.local to enable signup.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="auth-screen">
      <div className="auth-toolbar">
        <Link className="nav-brand" href="/">
          Nebula
        </Link>
        <ThemeToggle />
      </div>
      <div className="auth-body">
        <SignUp />
      </div>
    </div>
  );
}
