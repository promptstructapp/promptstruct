import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { checkUserQuota, incrementUserQuota } from "@/app/lib/utils/rateLimiter";
import { saveConversion } from "@/app/lib/db";
import { generateSceneJsonFromPrompt } from "@/app/lib/utils/llm";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const length = prompt.trim().length;
    if (length < 10 || length > 1000) {
      return NextResponse.json(
        { error: "Prompt must be between 10 and 1000 characters." },
        { status: 400 },
      );
    }

    const email = session.user.email;

    const quota = await checkUserQuota(email);
    if (!quota.allowed) {
      return NextResponse.json(
        {
          error: quota.error,
          quota,
        },
        { status: 429 },
      );
    }

    const jsonOutput = await generateSceneJsonFromPrompt(prompt);

    await incrementUserQuota(email);

    if (quota.user.plan === "pro") {
      try {
        await saveConversion(quota.user.id, prompt, jsonOutput);
      } catch (err) {
        console.error("Failed to save conversion history:", err);
      }
    }

    return NextResponse.json({
      output: jsonOutput,
      quota: {
        plan: quota.user.plan,
        remaining: quota.remaining,
      },
    });
  } catch (error) {
    console.error("Error in /api/parse:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

