import { DashboardNav } from "@/components/dashboard-nav";
import { clerkConfigured, supabaseConfigured } from "@/lib/env";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!clerkConfigured() || !supabaseConfigured()) {
    return (
      <main className="dash-main">
        <h1>Connect Clerk and Supabase</h1>
        <p className="text-muted">
          Add the keys listed in the README to <code>.env.local</code>, then restart the
          dev server.
        </p>
      </main>
    );
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="dash">
      <DashboardNav />
      <main className="dash-main">{children}</main>
    </div>
  );
}
