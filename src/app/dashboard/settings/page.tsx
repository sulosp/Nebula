import { BrandingForm } from "@/components/branding-form";
import { EmbedSnippet } from "@/components/embed-snippet";
import { getOrCreateClient } from "@/lib/clients";
import { appUrl, clerkConfigured, supabaseConfigured } from "@/lib/env";
import { isSubscriptionActive } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  if (!clerkConfigured() || !supabaseConfigured()) return null;
  const client = await getOrCreateClient();
  if (!isSubscriptionActive(client.subscription_status)) {
    redirect("/dashboard/billing");
  }

  const snippet = `<script src="${appUrl()}/widget.js" data-client="${client.public_key}" async></script>`;

  return (
    <section className="settings">
      <h1>Widget</h1>
      <p className="text-muted">Name, color, and the script tag for your site.</p>
      <BrandingForm client={client} />
      <div className="snippet-block">
        <h2>Embed</h2>
        <p className="text-muted">Paste this before the closing body tag.</p>
        <EmbedSnippet snippet={snippet} />
      </div>
    </section>
  );
}
