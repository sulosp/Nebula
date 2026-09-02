import { FaqTable } from "@/components/faq-table";
import { getOrCreateClient, listFaqs } from "@/lib/clients";
import { clerkConfigured, supabaseConfigured } from "@/lib/env";
import { isSubscriptionActive } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  if (!clerkConfigured() || !supabaseConfigured()) return null;
  const client = await getOrCreateClient();
  if (!isSubscriptionActive(client.subscription_status)) {
    redirect("/dashboard/billing");
  }
  const entries = await listFaqs(client.id);

  return (
    <section>
      <h1>FAQ</h1>
      <p className="text-muted">
        These answers are the only context the chatbot is allowed to use.
      </p>
      <FaqTable entries={entries} />
    </section>
  );
}
