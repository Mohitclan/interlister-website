import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { MarketplaceNetwork } from "@/components/sections/MarketplaceNetwork";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SelectiveSync } from "@/components/sections/SelectiveSync";
import { RealtimeSync } from "@/components/sections/RealtimeSync";
import { MeeshoFlow } from "@/components/sections/MeeshoFlow";
import { MarketplaceCards } from "@/components/sections/MarketplaceCards";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { Trust } from "@/components/sections/Trust";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { structuredData } from "@/lib/structuredData";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <MarketplaceNetwork />
        <ProblemSolution />
        <ProductShowcase />
        <SelectiveSync />
        <RealtimeSync />
        <MeeshoFlow />
        <MarketplaceCards />
        <HowItWorks />
        <DashboardPreview />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
