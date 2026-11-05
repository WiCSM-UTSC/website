interface GlassmorphicCardProps {
  subtitle: string;
  description: string;
}

function GlassmorphicCard({ subtitle, description }: GlassmorphicCardProps) {
  return (
    <article
      className="relative flex min-h-82.5 flex-col items-center rounded-[30px] border border-[#8162e6]/20 bg-[#b09eeb]/45 px-7 pt-10 pb-8 text-white shadow-[inset_0_1px_0_rgb(255_255_255/8%)] max-[600px]:min-h-72"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(135deg, rgba(115,75,220,0.88) 0%, rgba(129,98,230,0.2) 24%, rgba(129,98,230,0.16) 76%, rgba(115,75,220,0.88) 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "2px",
        }}
      />
      <svg aria-hidden="true" className="h-[100px] w-[88px] overflow-visible opacity-85 [filter:drop-shadow(0_0_5px_rgb(255_255_255/95%))_drop-shadow(0_0_12px_rgb(255_255_255/70%))]" fill="none" viewBox="0 0 88 100">
        <circle cx="44" cy="32" r="26" stroke="white" strokeOpacity="0.9" strokeWidth="12" />
        <path d="M44 58v34M24 78h40" stroke="white" strokeOpacity="0.9" strokeWidth="12" />
      </svg>
      <h3 className="mt-8 mb-0 text-[18px] font-semibold leading-6">{subtitle}</h3>
      <p className="mt-3.5 mb-0 w-full text-left text-[13px] font-medium leading-[1.35] text-white/90">{description}</p>
    </article>
  );
}

const values = [
  { subtitle: "Subtitle", description: "lorem ispsusdnmaksmda awojsa adjaodjkaldja iajsaSj oaisj aoisj aoijdmalojaoj" },
  { subtitle: "Subtitle", description: "lorem ispsusdnmaksmda awojsa adjaodjkaldja iajsaSj oaisj aoisj aoijdmalojaoj" },
  { subtitle: "Subtitle", description: "lorem ispsusdnmaksmda awojsa adjaodjkaldja iajsaSj oaisj aoisj aoijdmalojaoj" },
];

export function ValuesSection() {
  return (
    <section aria-labelledby="values-heading" className="min-h-[774px] bg-[linear-gradient(180deg,#faf8ff_0%,#b6afea_20%,#9189e7_34%,#6868e3_48%,#7370e4_63%,#8a83e5_72%,#aaa2e9_80%,#c4bced_87%,#e3def7_94%,#f5f3fc_98%,#fff_100%)] px-[clamp(24px,8.25vw,100px)] pt-[clamp(54px,5vw,64px)] pb-24 text-[#390d67] max-[600px]:min-h-0 max-[600px]:py-16">
      <h2 className="m-0 text-center text-[44px] font-semibold leading-[1.1] tracking-[-0.04em] max-[600px]:text-4xl" id="values-heading">OUR VALUES</h2>
      <div className="mx-auto mt-[clamp(92px,11vw,132px)] grid max-w-[1012px] grid-cols-3 gap-[clamp(28px,8.9vw,108px)] max-[760px]:mt-16 max-[760px]:grid-cols-2 max-[760px]:gap-6 max-[520px]:grid-cols-1 max-[520px]:gap-5">
        {values.map((value, index) => <GlassmorphicCard key={index} subtitle={value.subtitle} description={value.description} />)}
      </div>
    </section>
  );
}
