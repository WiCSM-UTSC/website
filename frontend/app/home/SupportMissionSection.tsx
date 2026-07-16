import SectionHeader from "@/components/SectionHeader";

export default function SupportMissionSection() {
  return (
    <section className="relative py-32 px-24 bg-[#ece7fa]">
      <div className="flex-col md:flex-row flex items-center justify-between gap-24">
        {/* LEFT: Image / placeholder */}
        <div
          className="w-[250px] h-[250px] md:w-[360px] md:h-[360px] rounded-3xl 
                        bg-white shadow-[0_0_40px_rgba(155,147,232,0.6)] shrink-0"
        />

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

      {/* subtle gradient that fades this section to white at the bottom*/}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to bottom, #ece7fa, #ffffff)" }}
      />
    </section>
  );
}
