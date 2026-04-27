"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

const images = [
  "/who/1.jpg",
  "/who/2.jpg",
  "/who/3.jpg",
  "/who/4.jpg",
  "/who/5.jpg",
];

export default function WhoWeAreSection() {
  const [failedSources, setFailedSources] = useState<Set<string>>(new Set());

  //useCallback to handle image error if it fails to render. 
  //If image url breaks or fails; then it shows a lightish purple background instead.
  //This should be removed before prod deployment
  const handleImageError = useCallback((src: string) => {
    setFailedSources((prev) => {
      if (prev.has(src)) {
        return prev;
      }

      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="text-center mb-16">
        <SectionHeader>WHO WE ARE</SectionHeader>
        <p className="mx-auto mt-6 max-w-5xl px-6 text-lg md:text-xl leading-relaxed text-[#2D1B4E]">
          WiCSM (Women in Computer Science, Statistics & Mathematics) is a student-led community at the University of Toronto Scarborough dedicated to empowering women and underrepresented groups in STEM. We create opportunities for learning, mentorship, and connection through events, workshops, and collaborations.
        </p>
      </div>

      {/* VIEWPORT */}
      <div className="relative w-full overflow-hidden">
        {/* SLIDER */}
        <div className="flex gap-6 sm:gap-8 animate-carousel px-6 sm:px-16 md:px-24">
          {[...Array(2)].flatMap((_, loopIndex) =>
            images.map((src, i) => (
              <div
                key={`${loopIndex}-${i}`}
                className="
                  relative shrink-0 overflow-hidden rounded-2xl
                  bg-[#e8e5f7]
                  min-w-[180px] h-[140px]
                  sm:min-w-[260px] sm:h-[200px]
                  md:min-w-[360px] md:h-[260px]
                "
              >
                {!failedSources.has(src) && (
                  <Image
                    src={src}
                    alt="Who we are"
                    fill
                    className="object-cover"
                    onError={() => handleImageError(src)}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
