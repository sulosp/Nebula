const EXPANSIONS: Record<string, string> = {
  "dark editorial web design":
    "dark mode editorial layout, serif headlines, restrained typography, luxury fashion web, high contrast photography, negative space",
  "minimal luxury branding":
    "luxury brand identity, monochrome logotype, premium packaging, restrained palette, high-end fashion branding, matte black",
  "editorial typography":
    "display serif, headline hierarchy, editorial magazine type, letterspacing, dark luxury typography",
  "dark mood photography":
    "low key photography, shadow, grain, fashion editorial, night shoot, product still life dark",
};

export async function expandQuery(query: string): Promise<string> {
  const normalized = query.trim().toLowerCase();
  if (EXPANSIONS[normalized]) return EXPANSIONS[normalized];

  const partial = Object.entries(EXPANSIONS).find(
    ([key]) => key.includes(normalized) || normalized.includes(key),
  );
  if (partial) return partial[1];

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return `${query}, editorial, dark, luxury, minimal, high contrast, restrained typography`;
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 80,
        messages: [
          {
            role: "system",
            content:
              "Expand visual design search queries into comma-separated style tags for image retrieval. Output only the tags, no prose.",
          },
          { role: "user", content: query },
        ],
      }),
    });

    if (!res.ok) throw new Error("LLM expansion failed");
    const data = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return data.choices[0]?.message?.content?.trim() ?? query;
  } catch {
    return `${query}, editorial, dark, luxury, minimal`;
  }
}
