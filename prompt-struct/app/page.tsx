import { ConversionForm } from "@/app/components/conversion/ConversionForm";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Convert prompts into structured JSON scenes.
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600">
          Paste a natural language description of a visual scene and get back a
          clean JSON object that follows a consistent schema for scene,
          elements, style, and mood. Perfect for generative art pipelines,
          creative tooling, and structured prompt engineering.
        </p>
      </section>

      <ConversionForm />
    </div>
  );
}

