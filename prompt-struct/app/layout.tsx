import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/app/components/auth/SessionProvider";
import { Navbar } from "@/app/components/ui/Navbar";
import { Instrument_Serif } from "next/font/google";
import { Footer } from "./components/ui/Footer";
import { Analytics } from "@vercel/analytics/react";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

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
    <html lang="en" className={instrumentSerif.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-white`}
      >
        <SessionProvider>
          <Navbar />
          {/* max-w-5xl ONLY wraps page content, NOT footer */}
          <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
            {children}
          </main>
          {/* Footer is outside main — full width */}
          <Footer />
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
