import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { WhyMSM } from "@/components/sections/WhyMSM";
import { Process } from "@/components/sections/Process";
import { MeetPainter } from "@/components/sections/MeetPainter";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { FAQ } from "@/components/sections/FAQ";
import { BookingSection } from "@/components/booking/BookingSection";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <WhyMSM />
      <Process />
      {/* one painted surface for the whole sand band */}
      <div className="relative bg-surface-2">
        <MeetPainter />
        <TestimonialsCarousel />
      </div>
      <FAQ />
      <BookingSection />
      <QuoteCTA />
    </>
  );
}
