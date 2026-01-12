import SectionHeader from "./SectionHeader";
import ValueCard from "./ValueCard";

export default function OurValuesSection() {
  return (
    <section className="relative bg-[#9B93E8] py-40 text-center">
      <SectionHeader>
        OUR VALUES
      </SectionHeader>

      <div className="flex justify-center gap-12">
        <ValueCard
          title="Subtitle"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <ValueCard
          title="Subtitle"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <ValueCard
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
