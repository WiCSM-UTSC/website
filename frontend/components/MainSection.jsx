import Image from "next/image";

export default function MainSection() {
  return (
    <section
      className="min-h-screen flex items-center justify-between px-24
                 bg-gradient-to-br from-[#9B93E8] to-[#D8E9FF]"
    >
      {/* LEFT SIDE */}
      <div>
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

     /* {/* RIGHT SIDE */}
      {/* 
<Image
  src="/hero-placeholder.png"
  alt="Hero graphic"
  width={420}
  height={420}
  className="drop-shadow-2xl"
/> 
*/}

    </section>
  );
}
