import { Button } from "./button";

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="flex min-h-125 flex-col items-center bg-white px-[clamp(24px,8vw,108px)] pt-[clamp(72px,8vw,110px)] pb-[clamp(96px,10vw,140px)] text-center"
      id="about-us"
    >
      <h2 className="m-0 text-5xl font-semibold leading-none" id="about-heading">
        WHO WE ARE
      </h2>
      <p className="mt-[clamp(52px,6vw,76px)] mb-0 max-w-215 text-base font-semibold leading-none text-[#4B4A4A]">
        Short desc; kind of like a hook on what the club is. Shouldn’t be as long as an about us or
        contain the same info.
      </p>
      <div className="mt-[clamp(32px,4vw,44px)] w-[min(470px,100%)]">
        <Button variant="primary">Join now</Button>
      </div>
    </section>
  );
}
