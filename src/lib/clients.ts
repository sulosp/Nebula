import { cache } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkConfigured, supabaseConfigured } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase";
import { isSubscriptionActive, type ClientRow, type FaqEntry } from "@/lib/types";

function newPublicKey() {
  return `nb_${crypto.randomUUID().replaceAll("-", "")}`;
}

export const getOrCreateClient = cache(async (): Promise<ClientRow> => {
  if (!clerkConfigured() || !supabaseConfigured()) {
    redirect("/");
  }
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const db = supabaseAdmin();
  const existing = await db
    .from("clients")
    .select("*")
    .eq("clerk_user_id", userId)
    .maybeSingle();

  if (existing.error) throw existing.error;
  if (existing.data) return existing.data as ClientRow;

  const user = await currentUser();
  const name =
    user?.firstName?.trim() ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Support";

  const inserted = await db
    .from("clients")
    .insert({
      clerk_user_id: userId,
      name,
      color: "#9184d9",
      public_key: newPublicKey(),
      subscription_status: "inactive",
    })
    .select("*")
    .single();

  if (inserted.error) throw inserted.error;
  return inserted.data as ClientRow;
});

export async function requireActiveClient() {
  const client = await getOrCreateClient();
  if (!isSubscriptionActive(client.subscription_status)) {
    redirect("/dashboard/billing");
  }
  return client;
}

export async function listFaqs(clientId: string) {
  const db = supabaseAdmin();
  const result = await db
    .from("faq_entries")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: true });
  if (result.error) throw result.error;
  return (result.data ?? []) as FaqEntry[];
}

export async function getClientByPublicKey(publicKey: string) {
  const db = supabaseAdmin();
  const result = await db
    .from("clients")
    .select("*")
    .eq("public_key", publicKey)
    .maybeSingle();
  if (result.error) throw result.error;
  return (result.data as ClientRow | null) ?? null;
}
