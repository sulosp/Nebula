import { SubscribeButton } from "@/components/subscribe-button";
import { getOrCreateClient } from "@/lib/clients";
import { clerkConfigured, stripeConfigured, supabaseConfigured } from "@/lib/env";
import { mapStripeStatus, stripeClient } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { isSubscriptionActive } from "@/lib/types";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function BillingPage({ searchParams }: Props) {
  if (!clerkConfigured() || !supabaseConfigured()) return null;
  let client = await getOrCreateClient();
  const { session_id } = await searchParams;

  if (session_id && stripeConfigured()) {
    const session = await stripeClient().checkout.sessions.retrieve(session_id);
    if (session.payment_status === "paid" || session.status === "complete") {
      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id;
      let status = "active";
      if (subscriptionId) {
        const sub = await stripeClient().subscriptions.retrieve(subscriptionId);
        status = mapStripeStatus(sub.status);
      }
      await supabaseAdmin()
        .from("clients")
        .update({
          stripe_customer_id:
            typeof session.customer === "string"
              ? session.customer
              : session.customer?.id ?? client.stripe_customer_id,
          stripe_subscription_id: subscriptionId ?? client.stripe_subscription_id,
          subscription_status: status,
        })
        .eq("id", client.id);
      client = await getOrCreateClient();
    }
  }

  const active = isSubscriptionActive(client.subscription_status);

  if (active && session_id) {
    redirect("/dashboard");
  }

  return (
    <section>
      <h1>Billing</h1>
      <p className="text-muted">
        Status: <strong>{client.subscription_status}</strong>
      </p>
      {active ? (
        <p>Subscription is active. FAQ dashboard is unlocked.</p>
      ) : (
        <>
          <p>Subscribe to add FAQs and get your embed script.</p>
          {stripeConfigured() ? (
            <SubscribeButton />
          ) : (
            <p className="form-error">Set STRIPE_SECRET_KEY to enable checkout.</p>
          )}
        </>
      )}
    </section>
  );
}
