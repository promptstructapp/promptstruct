import { HeroSection } from "./components/ui/HeroSection";
import { ChatFAQ } from "./components/ui/Chatfaq";
import { HowItWorks } from "./components/ui/HowItWorks";
import { BuiltForCreators } from "./components/ui/BuildForCreators";
import { Reviews } from "./components/ui/Reviews";
import { Comparison } from "./components/ui/Comparison";
import { ConversionUI } from "./components/ui/Conversionui";
import { FAQ } from "./components/ui/Faq";
import { CTA } from "./components/ui/Cta";

export default function Home() {
  return (
    <>
      <div className="space-y-8">
        <HeroSection />
        <ChatFAQ />
        <HowItWorks />
        <BuiltForCreators />
        <Reviews />
        <Comparison />
        <ConversionUI />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}
