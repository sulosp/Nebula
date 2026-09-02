import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getOrCreateClient } from "@/lib/clients";
import { appUrl, stripeConfigured } from "@/lib/env";
import { faqPriceId, stripeClient } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!stripeConfigured()) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const client = await getOrCreateClient();
  const stripe = stripeClient();
  const priceId = await faqPriceId();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl()}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl()}/dashboard/billing`,
    client_reference_id: client.id,
    customer: client.stripe_customer_id || undefined,
    metadata: { client_id: client.id, clerk_user_id: userId },
    subscription_data: {
      metadata: { client_id: client.id, clerk_user_id: userId },
    },
  });

  if (session.customer && typeof session.customer === "string" && !client.stripe_customer_id) {
    await supabaseAdmin()
      .from("clients")
      .update({ stripe_customer_id: session.customer })
      .eq("id", client.id);
  }

  return NextResponse.json({ url: session.url });
}
