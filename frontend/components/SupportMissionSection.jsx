import Image from "next/image";
import SectionHeader from "./SectionHeader";

export default function SupportMissionSection() {
  return (
    <section className="py-32 px-24 bg-[#ece7fa]">
      <div className="flex-col md:flex-row flex items-center justify-between gap-24">

        {/* LEFT: Image / placeholder */}
        <div className="w-[250px] h-[250px] md:w-[360px] md:h-[360px] rounded-3xl 
                        bg-white shadow-[0_0_40px_rgba(155,147,232,0.6)] shrink-0" />

        {/* RIGHT: Text + CTA */}
        <div className="max-w-xl">
          <SectionHeader className="align-middle">
            SUPPORT OUR MISSION
          </SectionHeader>

          <p className="mt-4 text-[0.8rem] md:text-lg text-[#2D1B4E]">
            1–2 liner catch/hook, then say join us etc blah blah.
          </p>

          <button
            className="
              mt-8
              px-10
              py-3
              rounded-full
              bg-[#5A5A9E]
              text-white
              text-lg
              shadow-lg
              hover:opacity-90
              transition
            "
          >
            Contact us
          </button>
        </div>

      </div>
    </section>
  );
}
