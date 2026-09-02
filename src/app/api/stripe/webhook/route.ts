import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { mapStripeStatus, stripeClient } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await request.text();
  let event: Stripe.Event;
  try {
    event = stripeClient().webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const clientId = session.metadata?.client_id || session.client_reference_id;
    if (clientId) {
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
      await supabaseAdmin()
        .from("clients")
        .update({
          stripe_customer_id:
            typeof session.customer === "string" ? session.customer : session.customer?.id,
          stripe_subscription_id: subscriptionId,
          subscription_status: "active",
        })
        .eq("id", clientId);
    }
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const clientId = subscription.metadata?.client_id;
    const status = mapStripeStatus(subscription.status);
    const db = supabaseAdmin();
    if (clientId) {
      await db
        .from("clients")
        .update({
          stripe_subscription_id: subscription.id,
          subscription_status: status,
        })
        .eq("id", clientId);
    } else {
      await db
        .from("clients")
        .update({ subscription_status: status })
        .eq("stripe_subscription_id", subscription.id);
    }
  }

  return NextResponse.json({ received: true });
}
