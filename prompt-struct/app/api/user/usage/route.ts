import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { checkUserQuota } from "@/app/lib/utils/rateLimiter";
import { getUserHistory } from "@/app/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const quota = await checkUserQuota(email);
    const userId: string | undefined = session.user.id;
    let history: unknown[] = [];
    if (userId) {
      try {
        history = await getUserHistory(userId, 10);
      } catch (err) {
        console.error("Failed to load user history:", err);
      }
    }

    return NextResponse.json({
      plan: quota.user?.plan ?? "free",
      quota,
      history,
    });
  } catch (error) {
    console.error("Error in /api/user/usage:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
