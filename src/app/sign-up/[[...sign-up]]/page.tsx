import { SignUp } from "@clerk/nextjs";
import { clerkConfigured } from "@/lib/env";

export default function SignUpPage() {
  if (!clerkConfigured()) {
    return (
      <main className="auth-screen">
        <p>Set Clerk keys in .env.local to enable signup.</p>
      </main>
    );
  }

  return (
    <div className="auth-screen">
      <SignUp />
    </div>
  );
}
