// app/lib/utils/llm.ts

export const OUTPUT_SCHEMA = {
  scene: {
    description: "string — one-sentence summary of the overall scene",
    time_of_day: "string — e.g. 'golden hour', 'night', 'midday'",
    weather: "string — e.g. 'clear', 'overcast', 'rainy'",
  },
  subject: {
    main: "string — primary subject",
    action: "string — what the subject is doing",
    details: "string — visual details (color, texture, expression, etc.)",
  },
  environment: {
    setting: "string — location or backdrop",
    foreground: "string — elements in front",
    background: "string — elements behind",
  },
  lighting: {
    type: "string — e.g. 'soft diffused', 'dramatic side-light', 'neon glow'",
    direction: "string — e.g. 'from the left', 'overhead', 'backlit'",
    color_temperature: "string — e.g. 'warm amber', 'cool blue'",
  },
  style: {
    art_style:
      "string — e.g. 'photorealistic', 'Studio Ghibli', 'oil painting'",
    camera_angle: "string — e.g. 'eye-level', 'bird's eye', 'low angle'",
    lens: "string — e.g. '85mm portrait', 'wide angle', 'macro'",
    color_palette: "string — dominant colors or mood palette",
  },
  mood: {
    emotion: "string — overall emotional tone",
    atmosphere: "string — descriptive atmosphere keyword",
  },
};

export type SceneJson = {
  scene: {
    description: string;
    time_of_day: string;
    weather: string;
  };
  subject: {
    main: string;
    action: string;
    details: string;
  };
  environment: {
    setting: string;
    foreground: string;
    background: string;
  };
  lighting: {
    type: string;
    direction: string;
    color_temperature: string;
  };
  style: {
    art_style: string;
    camera_angle: string;
    lens: string;
    color_palette: string;
  };
  mood: {
    emotion: string;
    atmosphere: string;
  };
};

const SYSTEM_PROMPT = `You are a structured prompt parser for AI image generation tools like Midjourney, DALL·E, and Stable Diffusion.

When given a natural language scene description, extract and return ONLY a valid JSON object — no explanation, no markdown fences, no extra text.

The JSON must strictly follow this schema:
{
  "scene": {
    "description": "one-sentence summary of the scene",
    "time_of_day": "e.g. golden hour, night, midday, dusk",
    "weather": "e.g. clear, overcast, foggy, rainy"
  },
  "subject": {
    "main": "primary subject of the image",
    "action": "what the subject is doing",
    "details": "visual details like color, texture, expression, clothing"
  },
  "environment": {
    "setting": "location or backdrop",
    "foreground": "elements in the front of the scene",
    "background": "elements behind the subject"
  },
  "lighting": {
    "type": "e.g. soft diffused, dramatic side-light, neon glow, candlelight",
    "direction": "e.g. from the left, overhead, backlit, front-lit",
    "color_temperature": "e.g. warm amber, cool blue, neutral white"
  },
  "style": {
    "art_style": "e.g. photorealistic, oil painting, Studio Ghibli, watercolor, cinematic",
    "camera_angle": "e.g. eye-level, bird's eye, low angle, Dutch tilt",
    "lens": "e.g. 85mm portrait, wide angle 24mm, macro, fish-eye",
    "color_palette": "dominant colors or mood palette description"
  },
  "mood": {
    "emotion": "overall emotional tone",
    "atmosphere": "one evocative atmosphere keyword"
  }
}

Rules:
- Output ONLY the JSON object. No prose, no markdown, no code fences.
- Infer missing details intelligently from context clues in the prompt.
- All values must be strings.
- Never leave a field empty — make a reasonable creative inference if needed.`;

export async function generateSceneJsonFromPrompt(
  prompt: string,
): Promise<SceneJson> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in environment variables.");
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // OpenRouter uses these to attribute traffic in their dashboard
        "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
        "X-Title": "Prompt Struct",
      },
      body: JSON.stringify({
        // Free models on OpenRouter — uncomment to switch:
        // "google/gemma-3-27b-it:free"
        // "meta-llama/llama-3.1-8b-instruct:free"
        model: "openrouter/free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 1200,
      }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const raw: string = data.choices?.[0]?.message?.content;

  if (!raw) {
    throw new Error("Empty response received from LLM.");
  }

  // Strip any accidental markdown fences the model may wrap around the JSON
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  // Try parsing as-is first
  try {
    return JSON.parse(cleaned) as SceneJson;
  } catch {
    // The model truncated the JSON — attempt to repair it by closing all
    // open braces/brackets so JSON.parse can succeed
    const repaired = repairTruncatedJson(cleaned);
    try {
      return JSON.parse(repaired) as SceneJson;
    } catch {
      throw new Error(
        "LLM returned invalid JSON even after repair. Raw: " + cleaned,
      );
    }
  }
}

/**
 * Closes any unclosed braces/brackets in a truncated JSON string.
 * Handles the common case where the LLM hits max_tokens mid-object.
 */
function repairTruncatedJson(str: string): string {
  let result = str;

  // If the string ends mid-value (no closing quote), close the string
  const quoteCount = (result.match(/"/g) || []).length;
  if (quoteCount % 2 !== 0) {
    result += '"';
  }

  // Remove trailing commas before we close — they cause parse errors
  result = result.replace(/,\s*$/, "");

  // Count unclosed braces and brackets
  const stack: string[] = [];
  let inString = false;
  for (let i = 0; i < result.length; i++) {
    const ch = result[i];
    if (ch === '"' && result[i - 1] !== "\\") inString = !inString;
    if (inString) continue;
    if (ch === "{") stack.push("}");
    else if (ch === "[") stack.push("]");
    else if (ch === "}" || ch === "]") stack.pop();
  }

  // Close everything that's still open, innermost first
  result += stack.reverse().join("");
  return result;
}
