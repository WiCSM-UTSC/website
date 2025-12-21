import ValueCard from "./ValueCard";

export default function OurValuesSection() {
  return (
    <section className="relative bg-[#9B93E8] py-40 text-center">
      <h2 className="text-5xl font-bold text-[#2D1B4E] mb-20">
        OUR VALUES
      </h2>

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
    </section>
  );
}
