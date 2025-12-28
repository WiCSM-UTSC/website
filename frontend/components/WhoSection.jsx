"use client";

export default function WhoWeAreSection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <h2 className="text-5xl font-bold text-center mb-16 text-[#3A1B6B]">
        WHO WE ARE
      </h2>

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
                  flex-shrink-0
                "
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
