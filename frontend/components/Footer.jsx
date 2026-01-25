import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(to_bottom,_#F9F6FF33_0%,_#9BCEEE_45%,_#A9A7EB_100%)] px-8 py-16">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 max-w-6xl mx-auto">

        <div className="flex items-center gap-4">
          <Image
            src="/wicsm_logo_transparent_1.png"
            alt="WiCSM Logo"
            width={120}
            height={120}
          />
          <div>
            <p className="text-[#54528F] font-semibold text-4xl">WiCSM</p>
            <p className="text-[#54528F] text-sm">
              Women in Computer Science, Statistics and Mathematics UTSC
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-lg font-semibold text-white">
          <a href="#">QUICKLINK 1</a>
          <a href="#">QUICKLINK 2</a>
          <a href="#">QUICKLINK 3</a>
          <a href="#">QUICKLINK 4</a>
        </div>
      </div>

      <div className="w-full h-[2px] bg-[#674B91] opacity-20 my-10" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">

        <p className="text-white text-sm">
          WiCSM © 2026. All rights reserved.
        </p>

        <div className="flex gap-4">
          {[1, 2, 3, 4].map((_, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 bg-white rounded-full hover:bg-gray-200 transition"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
