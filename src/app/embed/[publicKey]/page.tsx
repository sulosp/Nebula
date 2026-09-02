import { getClientByPublicKey } from "@/lib/clients";
import { supabaseConfigured } from "@/lib/env";
import { notFound } from "next/navigation";
import { EmbedChat } from "./embed-chat";

type Props = {
  params: Promise<{ publicKey: string }>;
};

export default async function EmbedPage({ params }: Props) {
  if (!supabaseConfigured()) notFound();
  const { publicKey } = await params;
  const client = await getClientByPublicKey(publicKey);
  if (!client) notFound();

  return (
    <EmbedChat
      publicKey={client.public_key}
      name={client.name}
      color={client.color}
    />
  );
}
