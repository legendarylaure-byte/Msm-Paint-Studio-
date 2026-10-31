"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/Reveal";

const gallery = [
  // Original images
  { src: "/gallery/2-painting-exterior-of-house-how-to-choose-the-right-color.jpg", alt: "Exterior house painting transformation", tag: "Exterior" },
  { src: "/gallery/house-painting.jpeg", alt: "Professional house painting finish", tag: "Exterior" },
  { src: "/gallery/painting-walls-pink_53876-63286.avif", alt: "Beautifully painted interior space", tag: "Interior" },
  { src: "/gallery/image_80ce89ea.jpg", alt: "Detailed brush and cut-in work", tag: "Precision" },
  { src: "/gallery/blog125_ad25531fcf.jpg", alt: "Freshly painted walls with crisp lines", tag: "Walls" },
  { src: "/gallery/istockphoto-543817674-612x612.jpg", alt: "Quality paintwork on a feature wall", tag: "Feature" },
  { src: "/gallery/images.jpeg", alt: "Clean, even paint finish", tag: "Finishes" },
  { src: "/gallery/images (1).jpeg", alt: "Skilled painting preparation and application", tag: "Prep" },
  { src: "/gallery/images (2).jpeg", alt: "Crisp trim and detail work", tag: "Trim" },
  // New downloaded images
  { src: "/gallery/bailey-alexander-QQ6xmTXXFZ8-unsplash.jpg", alt: "Professional exterior painting transformation", tag: "Exterior" },
  { src: "/gallery/brett-jordan-IALMcAl3qYs-unsplash.jpg", alt: "Interior room makeover with fresh paint", tag: "Interior" },
  { src: "/gallery/brett-jordan-wLp29VrzNOM-unsplash.jpg", alt: "Detailed painting precision work", tag: "Precision" },
  { src: "/gallery/flow-clark-ioOlenqfMqA-unsplash.jpg", alt: "Professional painting finish", tag: "Walls" },
  { src: "/gallery/istockphoto-1409876538-1024x1024.jpg", alt: "Quality paintwork feature wall", tag: "Feature" },
  { src: "/gallery/pexels-blue-bird-7218003.jpg", alt: "Clean paint finish detail", tag: "Finishes" },
  { src: "/gallery/pexels-blue-bird-7218034.jpg", alt: "Skilled painting application", tag: "Prep" },
  { src: "/gallery/pexels-shkrabaanthony-5493662.jpg", alt: "Professional painting work", tag: "Trim" },
  { src: "/gallery/spacejoy-vOa-PSimwg4-unsplash.jpg", alt: "Interior painting transformation", tag: "Interior" },
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const duplicatedItems = [...gallery, ...gallery];

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= duplicatedItems.length - 1) return 0;
      return prev + 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const startAutoPlay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      goToNext();
    }, 3000);
  };

  const pauseAutoPlay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section id="gallery" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Our work"
          title="Proof in every"
          accent="coat"
          intro="A glimpse of the prep, precision and finish that goes into every MSM Painting Studio job across Berwick, Casey & Cardinia."
          brushWords={3}
          followPaint
        />

        <div
          ref={containerRef}
          className="mt-10 relative"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          {/* Marquee Container */}
          <div
            className="flex gap-6 animate-marquee"
            style={{
              animation: isAutoPlaying ? 'marquee 30s linear infinite' : 'none'
            }}
          >
            {duplicatedItems.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className="flex-shrink-0 w-[280px] sm:w-[320px] relative group"
                style={{
                  animation: currentIndex === index ? 'none' : 'none'
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-white/60 bg-card shadow-[0_24px_64px_-34px_rgba(15,16,38,0.8)] dark:border-white/10">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 80vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 z-20 rounded-full bg-brush-paint px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const realIndex = index;
                  setCurrentIndex(realIndex);
                }}
                className={`h-2.5 w-10 rounded-full transition-all duration-300 border border-line/40 ${index === currentIndex % gallery.length
                    ? "bg-brush-paint scale-100 shadow-[0_0_0_3px_rgba(255,107,53,0.15)]"
                    : "bg-ink/25 dark:bg-white/50 hover:bg-ink/50 dark:hover:bg-white/80 scale-75"
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}