// TODO: Replace with real LLM calls (Maaza / OpenRouter) later.
// This placeholder keeps the final JSON shape stable so the rest
// of the app does not need refactoring when you plug in providers.

export const OUTPUT_SCHEMA = {
  scene: {
    type: "object",
    properties: {
      type: { type: "string" },
      setting: { type: "string" },
      time_of_day: { type: "string" },
    },
  },
  elements: {
    type: "object",
    properties: {
      primary: { type: "array", items: { type: "string" } },
      secondary: { type: "array", items: { type: "string" } },
      details: { type: "string" },
    },
  },
  style: {
    type: "object",
    properties: {
      artist: { type: "string" },
      movement: { type: "string" },
      technique: { type: "string" },
    },
  },
  mood: { type: "string" },
} as const;

export type SceneJson = {
  scene: {
    type: string;
    setting: string;
    time_of_day: string;
  };
  elements: {
    primary: string[];
    secondary: string[];
    details: string;
  };
  style: {
    artist: string;
    movement: string;
    technique: string;
  };
  mood: string;
};

export async function generateSceneJsonFromPrompt(
  prompt: string,
): Promise<SceneJson> {
  console.log("LLM placeholder called with prompt:", {
    length: prompt.length,
    preview: prompt.slice(0, 80),
  });

  // PLACEHOLDER: simple deterministic struct based on the prompt text.
  // Replace this with real calls to Maaza / OpenRouter later.
  const lowered = prompt.toLowerCase();

  let inferredTime: string = "unspecified";
  if (lowered.includes("sunset") || lowered.includes("dusk")) {
    inferredTime = "sunset";
  } else if (lowered.includes("night")) {
    inferredTime = "night";
  } else if (lowered.includes("morning")) {
    inferredTime = "morning";
  } else if (lowered.includes("noon") || lowered.includes("midday")) {
    inferredTime = "midday";
  }

  return {
    scene: {
      type: "scene",
      setting: "unspecified setting (placeholder)",
      time_of_day: inferredTime,
    },
    elements: {
      primary: ["primary subject (placeholder)"],
      secondary: ["secondary detail (placeholder)"],
      details: prompt,
    },
    style: {
      artist: "unspecified (placeholder)",
      movement: "unspecified (placeholder)",
      technique: "unspecified (placeholder)",
    },
    mood: "unspecified (placeholder)",
  };
}

