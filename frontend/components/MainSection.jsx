import Image from "next/image";

export default function MainSection() {
  return (
    <div className="bg-white">
      <section
        className="
          relative
          min-h-screen
          flex
          flex-col
          md:flex-row
          items-center
          justify-center
          md:justify-between
          px-24
          overflow-hidden
          bg-linear-to-br
          from-[#9B93E8]
          via-[#B8C5FF]
          to-[#D8E9FF]
        "
      >
        {/* content */}
        <div className="relative z-10 max-w-xl text-center md:text-left order-2 md:order-1">
          <h1 className="text-6xl md:text-9xl font-bold text-[#3A1B6B] drop-shadow-lg">
            WiCSM
          </h1>

          <h2 className="text-xl md:text-4xl mt-2 text-[#3A1B6B]">UTSC</h2>

          <p className="mt-6 text-[0.8rem] md:text-lg text-[#2D1B4E]">
            Motto, saying Motto, saying Motto, saying Motto, saying
          </p>
        </div>

        {/* blue glow  + image */}
        <div className="relative order-1 md:order-2 w-[200px] h-[200px] md:w-[500px] md:h-[500px] shrink-0">
          <div
            className="
            absolute
            inset-0
            w-full
            h-full
            pointer-events-none
          "
            style={{
              background:
                "radial-gradient(circle, rgba(94, 183, 255, 0.8) 0%, rgba(94, 183, 255, 0.5) 30%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          <p className="text-center text-blue-950">image component goes below</p>

          {/* image component goes here - sample below on how to use the z-overlay */}
          {/* <Image 
            src="/your-image.png" 
            alt="WiCSM" 
            width={600}
            height={600}
            className="relative z-10 w-full h-full object-contain"
          /> */}
        </div>

        {/* overlay fade out at bottom */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-px
            left-0
            w-full
            h-[30vh]
            z-20
            bg-linear-to-b
            from-transparent
            via-white/30
            to-white
  "
        />
      </section>
    </div>
  );
}
