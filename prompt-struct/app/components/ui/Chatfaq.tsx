"use client";

import { useEffect, useRef, useState } from "react";

const messages = [
  {
    id: 1,
    type: "user",
    text: "Why do AI image tools ignore my prompts?",
  },
  {
    id: 2,
    type: "bot",
    text: 'Natural language is ambiguous. "A serene mountain landscape" means different things to different models, leading to inconsistent outputs and wasted credits. PromptStruct structures your intent so AI models parse it reliably.',
  },
  {
    id: 3,
    type: "user",
    text: "How does JSON prompting improve output consistency?",
  },
  {
    id: 4,
    type: "bot",
    text: "JSON gives AI models clear, parseable instructions. You define scene, elements, style, and mood as structured fields making outputs repeatable, editable, and exportable across tools.",
  },
];

function UserAvatar() {
  return (
    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-zinc-200 ring-2 ring-white shadow-sm">
      <img
        src="https://i.pravatar.cc/40?img=47"
        alt="User"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function BotAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-blue-200 bg-white text-blue-500 text-[10px] font-semibold shadow-sm">
      {"{...}"}
    </div>
  );
}

function TypingIndicator({ isUser }: { isUser: boolean }) {
  return (
    <div
      className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-1`}
    >
      <div
        className={`flex items-center gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        {isUser ? <UserAvatar /> : <BotAvatar />}
        <div
          className={`flex gap-1.5 rounded-2xl px-4 py-3.5 border ${
            isUser
              ? "bg-blue-600 border-blue-700 rounded-br-none"
              : "bg-blue-50 border-blue-200 rounded-bl-none"
          }`}
        >
          <span
            className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}

function ChatBubble({
  msg,
  visible,
  isLast,
}: {
  msg: (typeof messages)[0];
  visible: boolean;
  isLast: boolean;
}) {
  const isUser = msg.type === "user";

  return (
    <div
      className={`flex flex-col transition-all duration-500 ease-out ${
        isUser ? "items-end" : "items-start"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}
    >
      {/* Avatar + Bubble row */}
      <div
        className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        {isUser ? <UserAvatar /> : <BotAvatar />}

        {/* Bubble */}
        <div
          className={`relative max-w-sm px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-primary text-white rounded-2xl rounded-br-none"
              : "bg-blue-50 text-blue-900 border border-blue-200 rounded-2xl rounded-bl-none"
          }`}
        >
          {msg.text}
        </div>
      </div>

      {/* Bottom tail — only on the most recently revealed bubble */}
      {isLast && (
        <div className={`flex mt-1 ${isUser ? "pr-11" : "pl-11"}`}>
          {/* Triangle pointing down */}
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: isUser ? "8px solid #2563EB" : "8px solid #BFDBFE",
            }}
          />
        </div>
      )}
    </div>
  );
}

export function ChatFAQ() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  function revealNext(index: number) {
    if (index >= messages.length) return;

    const msg = messages[index];

    if (msg.type === "bot") {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setVisibleCount(index + 1);
        setTimeout(() => revealNext(index + 1), 700);
      }, 1000);
    } else {
      setVisibleCount(index + 1);
      setTimeout(() => revealNext(index + 1), 600);
    }
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            setTimeout(() => revealNext(0), 300);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Next message to be revealed (for typing indicator)
  const nextMsg = messages[visibleCount];

  return (
    <section ref={sectionRef} className="mx-auto max-w-2xl px-4 py-16">
      {/* Badge */}
      <div className="flex justify-center mb-10">
        <span className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5 text-sm text-zinc-500 font-medium">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Why PromptStruct?
        </span>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col gap-4">
        {messages.map((msg, i) => {
          const isLastVisible = i === visibleCount - 1;
          // Hide the tail on a bubble if the next message is already visible
          const showTail =
            isLastVisible && !showTyping && visibleCount < messages.length;

          return (
            <ChatBubble
              key={msg.id}
              msg={msg}
              visible={i < visibleCount}
              isLast={showTail}
            />
          );
        })}

        {/* Typing indicator shows for the upcoming bot message */}
        {showTyping && nextMsg && (
          <TypingIndicator isUser={nextMsg.type === "user"} />
        )}
      </div>
    </section>
  );
}
