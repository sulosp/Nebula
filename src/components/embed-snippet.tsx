"use client";

import { useState } from "react";

export function EmbedSnippet({ snippet }: { snippet: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="snippet">
      <textarea className="input snippet-code" readOnly value={snippet} rows={3} />
      <button className="btn btn-secondary" type="button" onClick={copy}>
        {copied ? "Copied" : "Copy script tag"}
      </button>
    </div>
  );
}
