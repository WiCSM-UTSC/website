import Image from "next/image";
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
          <SectionHeader>DATA BITES</SectionHeader>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24">
          <div className="space-y-4">
            <p className="text-lg text-[#2D1B4E] max-w-md leading-relaxed">
              Data Bites is WiCSM's flagship networking event, designed to connect students with industry professionals in a setting that feels approachable, honest, and genuinely useful.
            </p>
            <p className="text-lg text-[#2D1B4E] max-w-md leading-relaxed">
              Each year, we bring together students from across programs and universities with professionals working in roles like software engineering, data science, consulting, project management, academia, and more. The goal is simple: to make career exploration less intimidating and more human.
            </p>
            <p className="text-lg text-[#2D1B4E] max-w-md leading-relaxed">
              With ~100 attendees annually, Data Bites creates space for students to ask questions, build connections, and gain clarity on what comes next, whether that's their first internship or a long-term career direction.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div
            className="
              relative
              w-[280px] h-[280px]
              md:w-[420px] md:h-[420px]
              rounded-3xl
              overflow-hidden
              shadow-[0_0_40px_rgba(155,147,232,0.45)]
              mx-auto md:mx-0
            "
          >
            <Image
              src="/data-bites.jpg"
              alt="Data Bites"
              fill
              className="object-cover"
            />
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
