"use client";

import Image from "next/image";
import SectionHeader from "./SectionHeader";

const images = [
  "/who/1.jpg",
  "/who/2.jpg",
  "/who/3.jpg",
  "/who/4.jpg",
  "/who/5.jpg",
];

export default function WhoWeAreSection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="text-center mb-16">
        <SectionHeader>WHO WE ARE</SectionHeader>
      </div>

      {/* VIEWPORT */}
      <div className="relative w-full overflow-hidden">
        {/* SLIDER */}
        <div className="flex gap-10 animate-carousel px-24">
          {[...Array(2)].flatMap((_, loopIndex) =>
            images.map((src, i) => (
              <div
                key={`${loopIndex}-${i}`}
                className="
                  relative
                  min-w-[360px]
                  h-[260px]
                  rounded-2xl
                  overflow-hidden
                  bg-gray-200
                  shrink-0
                "
              >
                <Image
                  src={src}
                  alt="Who we are"
                  fill
                  className="object-cover"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
