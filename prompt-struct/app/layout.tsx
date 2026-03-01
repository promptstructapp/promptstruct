import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/app/components/auth/SessionProvider";
import { Navbar } from "@/app/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt → JSON Struct",
  description:
    "Convert natural language scene descriptions into structured JSON schema.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50`}
      >
        <SessionProvider>
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}

