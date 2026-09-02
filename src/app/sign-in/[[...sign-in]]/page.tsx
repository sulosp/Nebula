import { SignIn } from "@clerk/nextjs";
import { clerkConfigured } from "@/lib/env";

export default function SignInPage() {
  if (!clerkConfigured()) {
    return (
      <main className="auth-screen">
        <p>Set Clerk keys in .env.local to enable login.</p>
      </main>
    );
  }

  return (
    <div className="auth-screen">
      <SignIn />
    </div>
  );
}
