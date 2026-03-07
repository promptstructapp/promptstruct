import { PricingComparison } from "./components/Pricing";
import { Reviews } from "../components/ui/Reviews";
import { FAQ } from "../components/ui/Faq";

export default function Pricing() {
  return (
    <>
      <div className="space-y-8">
        <PricingComparison />
        <Reviews />
        <FAQ />
      </div>
    </>
  );
}
