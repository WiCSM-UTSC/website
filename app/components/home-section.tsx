import { Navbar } from "./navbar";

export function HomeSection() {
  return (
    <section
      aria-label="WiCSM"
      className="relative flex min-h-screen items-center bg-[linear-gradient(180deg,#9895F2_0%,#9895F2_58%,#d0c9f0_78%,#faf8ff_100%)] p-[clamp(32px,8vw,108px)]"
    >
      <div className="absolute top-[clamp(20px,5vw,44px)] right-[clamp(16px,8vw,108px)] left-[clamp(16px,8vw,108px)]">
        <Navbar />
      </div>
      <div>
        <h1 className="m-0 flex flex-col font-semibold leading-[0.86] tracking-[-0.055em]">
          <span className="text-[clamp(72px,12.5vw,154px)] [text-shadow:0_8px_18px_rgb(57_13_103/24%)]">
            WiCSM
          </span>
          <span className="mt-[clamp(24px,3vw,38px)] ml-6 text-[clamp(34px,4.6vw,56px)] font-medium tracking-tight">
            UTSC
          </span>
        </h1>
        <p className="mt-[clamp(64px,8vw,96px)] mb-0 ml-6 text-[clamp(16px,1.7vw,20px)] font-medium leading-[1.4]">
          Motto, saying Motto, saying Motto, saying Motto, saying
        </p>
      </div>
    </section>
  );
}
