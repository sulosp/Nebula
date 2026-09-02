"use server";

import { revalidatePath } from "next/cache";
import { requireActiveClient } from "@/lib/clients";
import { supabaseAdmin } from "@/lib/supabase";

export async function addFaq(formData: FormData) {
  const client = await requireActiveClient();
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  if (!question || !answer) return;

  const result = await supabaseAdmin().from("faq_entries").insert({
    client_id: client.id,
    question,
    answer,
  });
  if (result.error) throw result.error;
  revalidatePath("/dashboard");
}

export async function updateFaq(formData: FormData) {
  const client = await requireActiveClient();
  const id = String(formData.get("id") ?? "");
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  if (!id || !question || !answer) return;

  const result = await supabaseAdmin()
    .from("faq_entries")
    .update({ question, answer })
    .eq("id", id)
    .eq("client_id", client.id);
  if (result.error) throw result.error;
  revalidatePath("/dashboard");
}

export async function deleteFaq(formData: FormData) {
  const client = await requireActiveClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const result = await supabaseAdmin()
    .from("faq_entries")
    .delete()
    .eq("id", id)
    .eq("client_id", client.id);
  if (result.error) throw result.error;
  revalidatePath("/dashboard");
}

export async function updateBranding(formData: FormData) {
  const client = await requireActiveClient();
  const name = String(formData.get("name") ?? "").trim() || "Support";
  const color = String(formData.get("color") ?? "").trim() || "#9184d9";

  const result = await supabaseAdmin()
    .from("clients")
    .update({ name, color })
    .eq("id", client.id);
  if (result.error) throw result.error;
  revalidatePath("/dashboard/settings");
}
