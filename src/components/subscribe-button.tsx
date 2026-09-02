"use client";

import { useState } from "react";

export function SubscribeButton() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function checkout() {
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error || "Could not start checkout.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Could not start checkout.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button className="btn btn-primary" disabled={pending} onClick={checkout} type="button">
        {pending ? "Redirecting…" : "Subscribe — $29/mo"}
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
