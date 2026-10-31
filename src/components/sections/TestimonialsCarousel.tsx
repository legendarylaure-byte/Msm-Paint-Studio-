"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allTestimonials = [...testimonials, ...testimonials]; // Duplicate for seamless loop

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % allTestimonials.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide, allTestimonials.length]);

  const goToPrevious = useCallback(() => {
    const prevIndex = (currentIndex - 1 + allTestimonials.length) % allTestimonials.length;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide, allTestimonials.length]);

  const startAutoPlay = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      goToNext();
    }, 5000);
  }, [goToNext]);

  const pauseAutoPlay = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
    pauseAutoPlay();
  }, [pauseAutoPlay]);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
    startAutoPlay();
  }, [startAutoPlay]);

  const lead = allTestimonials[currentIndex];

  // Set up auto-play on mount
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startAutoPlay]);

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Happy clients"
          title="The kind of words"
          accent="that make our day"
          align="left"
          brushWords={3}
          followPaint
        />

        <div
          ref={containerRef}
          className="mt-12 sm:mt-16 relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Lead Testimonial */}
          <Reveal className="relative">
            <figure className="relative border-t border-line pt-10 sm:pt-12">
              <div className="absolute top-0 right-0 -translate-y-1/2 rounded-full bg-surface p-3 shadow-lg">
                <Quote className="h-6 w-6 text-brush-ink" />
              </div>

              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
                <div className="mb-6 sm:mb-0 sm:mr-8">
                  <div className="h-24 w-24 rounded-full bg-surface border border-line flex items-center justify-center">
                    <span className="text-2xl font-bold text-brush-ink">
                      {lead.name.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-4 flex justify-center sm:justify-start">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < lead.stars ? 'fill-yellow-400 text-yellow-400' : 'text-line'}`}
                      />
                    ))}
                  </div>

                  <blockquote>
                    <p className="mb-4 text-lg font-medium text-ink leading-relaxed">
                      "{lead.quote}"
                    </p>
                    <footer className="font-semibold text-brush-ink">
                      {lead.name}, {lead.area}
                    </footer>
                  </blockquote>
                </div>
              </div>
            </figure>
          </Reveal>

          {/* Supporting Testimonials */}
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {allTestimonials.slice(currentIndex + 1, currentIndex + 4).map((testimonial, index) => (
              <Reveal key={`${testimonial.name}-${index}`} className="h-full">
                <figure className="h-full rounded-lg border border-line bg-surface p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-surface border border-line flex items-center justify-center">
                      <span className="text-lg font-semibold text-brush-ink">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-ink text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-ink/70">
                        {testimonial.tag}
                      </div>
                    </div>
                  </div>

                  <blockquote>
                    <p className="text-sm text-ink leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  <div className="mt-4 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.stars ? 'fill-yellow-400 text-yellow-400' : 'text-line'}`}
                      />
                    ))}
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="grid h-12 w-12 place-items-center rounded-full bg-surface border border-line hover:bg-surface-2 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-ink" />
            </button>

            <button
              onClick={goToNext}
              className="grid h-12 w-12 place-items-center rounded-full bg-surface border border-line hover:bg-surface-2 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-ink" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {allTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 w-10 rounded-full transition-all duration-300 border border-line/40 ${index === currentIndex % allTestimonials.length
                    ? "bg-brush-paint scale-100 shadow-[0_0_0_3px_rgba(255,107,53,0.15)]"
                    : "bg-ink/25 dark:bg-white/50 hover:bg-ink/50 dark:hover:bg-white/80 scale-75"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}