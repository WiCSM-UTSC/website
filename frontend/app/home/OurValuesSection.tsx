import SectionHeader from "@/components/SectionHeader";
import ValueCard from "@/components/ValueCard";
import { Lightbulb, Rocket, Users } from "lucide-react";

export default function OurValuesSection() {
  return (
    <section className="relative bg-[#9B93E8] py-20 text-center">
      {/* TOP FADE */}
      <div
        className="
            absolute
            top-0
            left-0
            w-full
            h-20
            pointer-events-none
            z-10
          "
        style={{
          background:
            "linear-gradient(180deg, rgba(155, 147, 232, 0.5) 0%, transparent 100%)",
        }}
      />

      <div className="mb-20">
        <SectionHeader>OUR VALUES</SectionHeader>
      </div>

      <div className="mx-auto flex w-full max-w-[980px] flex-col items-center justify-center gap-8 px-6 md:flex-row md:flex-nowrap md:gap-12">
        <ValueCard
          icon={
            <Users className="h-14 w-14 md:h-16 md:w-16" aria-hidden="true" />
          }
          title="Subtitle"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <ValueCard
          icon={
            <Lightbulb
              className="h-14 w-14 md:h-16 md:w-16"
              aria-hidden="true"
            />
          }
          title="Subtitle"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <ValueCard
          icon={
            <Rocket className="h-14 w-14 md:h-16 md:w-16" aria-hidden="true" />
          }
          title="Subtitle"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      </div>

      {/* BOTTOM FADE */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-20
          pointer-events-none
          z-10
        "
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(155, 147, 232, 0.5) 100%)",
        }}
      />
    </section>
  );
}
