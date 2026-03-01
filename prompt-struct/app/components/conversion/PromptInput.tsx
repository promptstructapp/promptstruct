"use client";

import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function PromptInput({ value, onChange, disabled }: Props) {
  const [focused, setFocused] = useState(false);

  const length = value.trim().length;
  const min = 10;
  const max = 1000;

  const tooShort = length > 0 && length < min;
  const tooLong = length > max;

  return (
    <div className="space-y-2">
      <div
        className={`rounded-2xl border bg-white p-3 shadow-sm transition-colors ${
          focused ? "border-zinc-900" : "border-zinc-200"
        } ${disabled ? "opacity-60" : ""}`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          placeholder="Describe the visual scene you want structured into JSON. Mention setting, characters, style, and mood."
          className="h-40 w-full resize-none border-0 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </div>
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>
          {tooShort && "Add a bit more detail (min 10 characters)."}
          {tooLong && "Prompt is too long (max 1000 characters)."}
          {!tooShort && !tooLong && "10–1000 characters recommended."}
        </span>
        <span className={tooShort || tooLong ? "text-red-500" : ""}>
          {length} / {max}
        </span>
      </div>
    </div>
  );
}

