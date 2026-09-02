"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "bot"; text: string };

export function EmbedChat({
  publicKey,
  name,
  color,
}: {
  publicKey: string;
  name: string;
  color: string;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: `Hi — ask ${name} a question.` },
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.parent?.postMessage({ type: "nebula-color", color }, "*");
  }, [color]);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages, pending]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || pending) return;
    setInput("");
    setMessages((current) => [...current, { role: "user", text }]);
    setPending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicKey, message: text }),
      });
      const data = (await res.json()) as { answer?: string };
      setMessages((current) => [
        ...current,
        { role: "bot", text: data.answer || "Please contact us." },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "bot", text: "Please contact us." },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="embed-chat" style={{ ["--widget-color" as string]: color }}>
      <header className="embed-head">
        <strong>{name}</strong>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => window.parent?.postMessage({ type: "nebula-close" }, "*")}
        >
          Close
        </button>
      </header>
      <div className="embed-log" ref={listRef}>
        {messages.map((message, index) => (
          <p
            key={`${message.role}-${index}`}
            className={message.role === "user" ? "bubble user" : "bubble bot"}
          >
            {message.text}
          </p>
        ))}
        {pending ? <p className="bubble bot">…</p> : null}
      </div>
      <form className="embed-form" onSubmit={onSubmit}>
        <input
          className="input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask a question"
          aria-label="Message"
        />
        <button className="btn btn-primary" disabled={pending} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
