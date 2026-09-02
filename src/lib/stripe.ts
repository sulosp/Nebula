import Stripe from "stripe";

let cached: Stripe | null = null;

export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY.");
  }
  if (!cached) {
    cached = new Stripe(key);
  }
  return cached;
}

export async function faqPriceId() {
  if (process.env.STRIPE_PRICE_ID) return process.env.STRIPE_PRICE_ID;

  const stripe = stripeClient();
  const existing = await stripe.prices.list({
    lookup_keys: ["nebula_faq_29"],
    active: true,
    limit: 1,
  });
  if (existing.data[0]) return existing.data[0].id;

  const price = await stripe.prices.create({
    lookup_key: "nebula_faq_29",
    currency: "usd",
    unit_amount: 2900,
    recurring: { interval: "month" },
    product_data: { name: "Nebula FAQ bot" },
  });
  return price.id;
}

export function mapStripeStatus(status: Stripe.Subscription.Status) {
  if (status === "active" || status === "trialing") return "active";
  if (status === "past_due") return "past_due";
  return "inactive";
}
