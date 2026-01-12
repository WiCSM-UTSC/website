"use client";
import Image from "next/image";
import { useState } from "react";

export default function MainSection() {
  const [active, setActive] = useState(0);

  const photos = [
    "/photi1.png",
    "/photi2.png",
    "/photi3.png",
  ];

  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-between
        px-24
        bg-gradient-to-br
        from-[#9B93E8]
        via-[#B8C5FF]
        to-[#D8E9FF]
        overflow-hidden
      "
    >
      {/* CONTENT */}
      <div className="relative z-10 max-w-xl">
        <h1 className="text-8xl font-bold text-[#3A1B6B] drop-shadow-lg">
          WiCSM
        </h1>

        <h2 className="text-4xl mt-2 text-[#3A1B6B]">UTSC</h2>

        <p className="mt-6 max-w-md text-lg text-[#2D1B4E]">
          Motto, saying Motto, saying Motto, saying
        </p>
      </div>

      {/* PHOTO STACK */}
      <div
        onClick={() => setActive((prev) => (prev + 1) % photos.length)}
        className="relative cursor-pointer"
      >
        <div className="relative w-[320px] h-[320px]">
          {photos.map((src, index) => {
            const offset =
              (index - active + photos.length) % photos.length;

            return (
              <div
                key={src}
                className="absolute inset-0 transition-all duration-500"
                style={{
                  zIndex: photos.length - offset,
                  transform: `translate(${offset * 10}px, ${offset * 10}px) rotate(${offset * 4 - 4}deg)`,
                }}
              >
                <div className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM GRADIENT FADE */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          w-full
          h-[30vh]
          bg-linear-to-b
          from-transparent
          via-white/30
          to-white
        "
      />
    </section>
  );
}
