"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) {
    return (
      <button
        type="button"
        className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-600 shadow-sm"
        disabled
      >
        Loading...
      </button>
    );
  }

  if (!session) {
    return (
      <button
        type="button"
        onClick={() => signIn("google")}
        className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow hover:bg-zinc-800"
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-zinc-700 sm:inline">
        {session.user?.name ?? session.user?.email}
      </span>
      <button
        type="button"
        onClick={() => signOut()}
        className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
      >
        Sign out
      </button>
    </div>
  );
}

