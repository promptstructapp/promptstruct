"use client";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent" />
      <span>Processing...</span>
    </div>
  );
}

