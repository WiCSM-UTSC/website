"use client";

import SectionHeader from "./SectionHeader";

export default function WhoWeAreSection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="text-center mb-16">
        <SectionHeader>
          WHO WE ARE
        </SectionHeader>
      </div>

      {/* VIEWPORT */}
      <div className="relative w-full overflow-hidden">
        {/* SLIDER */}
        <div className="flex gap-8 animate-carousel px-24">
          {[...Array(2)].flatMap(() =>
            [1, 2, 3, 4, 5].map((_, i) => (
              <div
                key={crypto.randomUUID()}
                className="
                  min-w-[300px]
                  h-[220px]
                  rounded-2xl
                  bg-gray-200
                  shrink-0
                "
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
