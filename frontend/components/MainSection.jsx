import Image from "next/image";

export default function MainSection() {
  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-between
        px-24
        bg-gradient-to-br
        from-[#9B93E8]
        to-[#D8E9FF]
        overflow-hidden
      "
    >
      {/* CONTENT */}
      <div className="relative z-10">
        <h1 className="text-8xl font-bold text-[#3A1B6B] drop-shadow-lg">
          WiCSM
        </h1>

        <h2 className="text-4xl mt-2 text-[#3A1B6B]">
          UTSC
        </h2>

        <p className="mt-6 max-w-md text-lg text-[#2D1B4E]">
          Motto, saying Motto, saying Motto, saying
        </p>
      </div>

      {/* BOTTOM GRADIENT FADE */}
      <div 
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-40
          z-0
          pointer-events-none
          bg-[linear-gradient(
          180deg,
          #9B93E8_0%,
          #B8C5FF_35%,
          #D8E9FF_65%,
          #EEF5FF_100%
        )]
      "
/>
</section>
  );
}
