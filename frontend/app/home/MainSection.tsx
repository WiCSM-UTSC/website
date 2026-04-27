"use client";
import Image from "next/image";
import { useState } from "react";

export default function MainSection() {
  const [active, setActive] = useState(0);

  const photos = ["/home-shuffle/1.JPG", "/home-shuffle/2.jpg", "/home-shuffle/3.jpeg"];

  return (
    <section
      className="
          relative
          min-h-screen
          flex
          flex-col
          md:flex-row
          items-center
          justify-center
          px-24
          gap-10
          md:gap-24
          overflow-hidden
          bg-linear-to-br
          from-[#9B93E8]
          via-[#B8C5FF]
          to-[#D8E9FF]
        "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-0 h-24 z-0"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0))",
        }}

      />
      {/* CONTENT */}
      <div className="relative z-10 max-w-xl text-center md:text-left order-2 md:order-1">
        <h1 className="text-[90px] md:text-9xl font-bold text-[#3A1B6B] drop-shadow-lg">
          WiCSM
        </h1>

        <h2 className="text-4xl mt-2 text-[#3A1B6B]">Women in Computer Science, Statistics & Mathematics</h2>

        <p className="mt-6 text-[0.8rem] md:text-lg text-[#2D1B4E]">
          University of Toronto Scarborough
        </p>
      </div>

      {/* PHOTO STACK */}
      <div
        onClick={() => setActive((prev) => (prev + 1) % photos.length)}
        className="relative cursor-pointer group order-1 md:order-2"
      >
        <div className="relative w-[320px] h-[320px]">
          {/* GLOW */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(94, 183, 255, 0.8) 0%, rgba(94, 183, 255, 0.5) 30%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* STACK */}
          {photos.map((src, index) => {
            const offset = (index - active + photos.length) % photos.length;

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
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM GRADIENT FADE */}
      <div
        className="
            absolute
            bottom-0
            left-0
            w-full
            h-40
            z-0
            pointer-events-none
            bg-[linear-gradient(
              180deg,
              #9B93E8_0%,
              #B8C5FF_35%,
              #D8E9FF_65%,
              #EEF5FF_100%
            )]
          "
      />
      <div
        className="
            pointer-events-none
            absolute
            -bottom-px
            left-0
            w-full
            h-[30vh]
            z-20
            bg-linear-to-b
            from-transparent
            via-white/30
            to-white"
      />
    </section>
  );
}
