import SectionHeader from "./SectionHeader";
import ValueCard from "./ValueCard";

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

      <h2 className="text-5xl font-bold text-[#2D1B4E] mb-20">OUR VALUES</h2>

      <div className="flex flex-col items-center md:flex-row justify-center gap-12">
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
