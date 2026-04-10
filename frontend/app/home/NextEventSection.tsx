import SectionHeader from "@/components/SectionHeader";

export default function NextEventSection() {
  return (
    <section
      className="
        relative
        pt-10 pb-48
        bg-white
      "
    >
      <div className="relative max-w-7xl mx-auto px-24">
        {/* TITLE */}
        <div className="mb-24 text-center">
          <SectionHeader>JOIN OUR NEXT EVENT</SectionHeader>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24">
          <p className="text-lg text-[#2D1B4E] max-w-md leading-relaxed">
            Short description or hook regarding joining our next event.Learn, 
            connect, and grow with the WiCSM community.
          </p>

          {/* RIGHT CARD */}
          <div
            className="
              w-[280px] h-[280px]
              md:w-[420px] md:h-[420px]
              rounded-3xl
              bg-white
              shadow-[0_0_40px_rgba(155,147,232,0.45)]
              flex items-center justify-center
              mx-auto md:mx-0
            "
          >
            {/* Placeholder — swap later */}
            <div className="text-gray-400"> Event Image</div>

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

      {/* overlay fade out at bottom */}
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
            via-white
            to-[#ece7fa]
  "
      />
    </section>
  );
}
