import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function SupportMissionSection() {
  return (
    <section className="relative py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#ece7fa]">
      <div className="flex-col md:flex-row flex items-center justify-center gap-20 md:gap-40">
        {/* LEFT: Image / placeholder */}
        <div
          className="relative w-[250px] h-[250px] md:w-[360px] md:h-[360px] rounded-3xl overflow-hidden 
                        shadow-[0_0_40px_rgba(155,147,232,0.6)] shrink-0"
        >
          <Image
            src="/sponsor.jpg"
            alt="WiCSM Sponsor"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT: Text + CTA */}
        <div className="max-w-xl text-center md:text-left">
          <SectionHeader>SUPPORT OUR MISSION</SectionHeader>

          <p className="mt-4 text-lg text-[#2D1B4E]">
            Support WiCSM in creating spaces where students can explore careers, build connections, and grow with confidence.
          </p>
          <p className="mt-4 text-lg text-[#2D1B4E]">
            Partner with us to engage with emerging talent and make a meaningful impact.
          </p>

          <Link
            href="/contact"
            className="
              mt-8
              inline-block
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
          </Link>
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
