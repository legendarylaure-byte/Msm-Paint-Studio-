import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyMSM } from "@/components/sections/WhyMSM";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { MeetPainter } from "@/components/sections/MeetPainter";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { BookingSection } from "@/components/booking/BookingSection";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyMSM />
      <Process />
      <Work />
      <MeetPainter />
      <Testimonials />
      <FAQ />
      <BookingSection />
      <QuoteCTA />
    </>
  );
}
