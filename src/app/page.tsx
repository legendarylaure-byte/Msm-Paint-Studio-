import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyMSM } from "@/components/sections/WhyMSM";
import { Process } from "@/components/sections/Process";
import { MeetPainter } from "@/components/sections/MeetPainter";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { BookingSection } from "@/components/booking/BookingSection";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export default function Home() {
  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <Services />
      <WhyMSM />
      <Process />
      {/* one painted surface for the whole sand band */}
      <div className="relative bg-surface-2">
        <MeetPainter />
        <Testimonials />
      </div>
      <FAQ />
      <BookingSection />
      <QuoteCTA />
    </>
  );
}
