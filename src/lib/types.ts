export type ClientRow = {
  id: string;
  clerk_user_id: string;
  name: string;
  color: string;
  public_key: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: string;
  created_at: string;
};

export type FaqEntry = {
  id: string;
  client_id: string;
  question: string;
  answer: string;
  created_at: string;
};

export const CONTACT_FALLBACK = "Please contact us.";

export function isSubscriptionActive(status: string) {
  return status === "active" || status === "trialing";
}
