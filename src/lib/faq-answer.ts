import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { CONTACT_FALLBACK, type FaqEntry } from "@/lib/types";

const DEFAULT_MODEL = "openai/gpt-oss-20b";

export async function answerFromFaq(params: {
  businessName: string;
  faqs: FaqEntry[];
  question: string;
}) {
  const question = params.question.trim();
  if (!question) return CONTACT_FALLBACK;
  if (params.faqs.length === 0) return CONTACT_FALLBACK;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set.");
  }

  const faqBlock = params.faqs
    .map((item, index) => `${index + 1}. Q: ${item.question}\n   A: ${item.answer}`)
    .join("\n");

  const { text } = await generateText({
    model: groq(process.env.GROQ_MODEL || DEFAULT_MODEL),
    instructions:
      `You are the website assistant for "${params.businessName}". ` +
      "Answer using ONLY the FAQ below. If the FAQ does not contain the answer, " +
      `reply with exactly: ${CONTACT_FALLBACK} ` +
      "Do not invent hours, prices, policies, or contact details. Keep answers short.",
    prompt: `FAQ:\n${faqBlock}\n\nVisitor question: ${question}`,
    maxOutputTokens: 400,
    temperature: 0.1,
  });

  const cleaned = text.trim();
  return cleaned || CONTACT_FALLBACK;
}
