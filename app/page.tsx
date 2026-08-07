import { GrainOverlay } from "@/components/illustrations/grain-overlay";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { FounderMemo } from "@/components/sections/founder-memo";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Industries } from "@/components/sections/industries";
import { Nav } from "@/components/sections/nav";
import { Outcomes } from "@/components/sections/outcomes";
import { Problem } from "@/components/sections/problem";
import { Quote } from "@/components/sections/quote";
import { Results } from "@/components/sections/results";
import { Services } from "@/components/sections/services";
import { TwoJobs } from "@/components/sections/two-jobs";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <TwoJobs />
        <Services />
        <Outcomes />
        <HowItWorks />
        <Industries />
        <Results />
        <Quote />
        <FounderMemo />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
      <GrainOverlay />
    </>
  );
}
