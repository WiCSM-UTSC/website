import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[linear-gradient(to_bottom,_#F9F6FF33_0%,_#9BCEEE_45%,_#A9A7EB_100%)] px-6 sm:px-12 md:px-20 py-16">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-12">

        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <Image
            src="/wicsm_logo_transparent_1.png"
            alt="WiCSM Logo"
            width={120}
            height={120}
          />
          <div>
            <p className="text-[#54528F] font-semibold text-4xl">
              WiCSM
            </p>
            <p className="text-[#54528F] text-sm">
              Women in Computer Science, Statistics and Mathematics UTSC
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-lg font-semibold text-white">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/aboutus" className="hover:underline">About</Link>
          <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-[#674B91] opacity-20 my-10" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

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