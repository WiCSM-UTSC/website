import Image from "next/image";

export default function NextEventSection() {
  return (
    <section
      className="
        relative
        pt-40 pb-48
        bg-white
      "
    >
      {/* TOP FADE */}
      <div
        className="
          absolute top-0 left-0 w-full h-48
          bg-gradient-to-b
          from-[#D8E9FF]
          via-[#EEF2FF]
          to-white
        "
      />

      <div className="relative max-w-7xl mx-auto px-24">
        {/* TITLE */}
        <h2 className="text-5xl font-bold text-[#3A1B6B] text-center mb-24">
          JOIN OUR NEXT EVENT
        </h2>

        {/* CONTENT */}
        <div className="grid grid-cols-2 items-center gap-24">
          {/* LEFT TEXT */}
          <p className="text-lg text-[#2D1B4E] max-w-md leading-relaxed">
            Short description or hook regarding joining our next event.
            Learn, connect, and grow with the WiCSM community.
          </p>

          {/* RIGHT CARD */}
          <div
            className="
              w-[420px] h-[420px]
              rounded-3xl
              bg-white
              shadow-[0_0_40px_rgba(155,147,232,0.45)]
              flex items-center justify-center
            "
          >
            {/* Placeholder — swap later */}
            <div className="text-gray-400">
              Event Image
            </div>

            {/*
            <Image
              src="/event-poster.png"
              alt="Next Event"
              width={380}
              height={380}
              className="rounded-2xl"
            />
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
