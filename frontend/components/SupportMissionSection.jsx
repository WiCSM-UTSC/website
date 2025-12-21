import Image from "next/image";

export default function SupportMissionSection() {
  return (
    <section className="py-32 px-24 bg-[#FAF8FF]">
      <div className="flex items-center justify-between gap-24">

        {/* LEFT: Image / placeholder */}
        <div className="w-[360px] h-[360px] rounded-3xl 
                        bg-white shadow-[0_0_40px_rgba(155,147,232,0.6)]" />

        {/* RIGHT: Text + CTA */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold text-[#3A1B6B]">
            SUPPORT OUR MISSION
          </h2>

          <p className="mt-4 text-lg text-[#2D1B4E]">
            1–2 liner catch/hook, then say join us etc blah blah.
          </p>

          <button
            className="mt-8 px-10 py-3 rounded-full
                       bg-[#5A5A9E] text-white text-lg
                       shadow-lg hover:opacity-90 transition"
          >
            Contact us
          </button>
          
        </div>
      </div>
    </section>
  );
}
