import { NextResponse } from "next/server";
import { answerFromFaq } from "@/lib/faq-answer";
import { getClientByPublicKey, listFaqs } from "@/lib/clients";
import { supabaseConfigured } from "@/lib/env";
import { CONTACT_FALLBACK } from "@/lib/types";

export async function POST(request: Request) {
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  }
  let body: { publicKey?: string; message?: string };
  try {
    body = (await request.json()) as { publicKey?: string; message?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const publicKey = body.publicKey?.trim();
  const message = body.message?.trim();
  if (!publicKey || !message) {
    return NextResponse.json({ error: "publicKey and message are required" }, { status: 400 });
  }

  const client = await getClientByPublicKey(publicKey);
  if (!client) {
    return NextResponse.json({ error: "Unknown client" }, { status: 404 });
  }

  try {
    const faqs = await listFaqs(client.id);
    const answer = await answerFromFaq({
      businessName: client.name,
      faqs,
      question: message,
    });
    return NextResponse.json({ answer });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ answer: CONTACT_FALLBACK });
  }
}
