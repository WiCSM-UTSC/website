"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link href="/" onClick={() => setOpen(false)}>HOME</Link>
      <Link href="/about" onClick={() => setOpen(false)}>ABOUT</Link>
      <Link href="/events" onClick={() => setOpen(false)}>EVENTS</Link>
      <Link href="/contact" onClick={() => setOpen(false)}>CONTACT</Link>
    </>
  );

  return (
    <nav className="relative border-3 border-[#54528F] rounded-3xl flex items-center justify-between py-2 px-7 max-w-5xl mx-auto">
      
      {/* Logo */}
      <Image
        src="/wicsm_logo_transparent_1.png"
        alt="WiCSM Logo"
        width={40}
        height={40}
      />

      <div className="hidden md:flex gap-20 font-semibold text-[#54528F] text-xl">
        <NavLinks />
      </div>

      <button className="hidden md:block px-10 py-2 bg-[#F7F3FB] rounded-2xl font-semibold text-[#54528F] text-xl">
        login
      </button>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-[#54528F] text-3xl"
      >
        ☰
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white rounded-3xl mt-2 py-6 flex flex-col items-center gap-6 font-semibold text-[#54528F] text-xl shadow-lg z-50">
          <NavLinks />
          <button className="px-10 py-2 bg-[#F7F3FB] rounded-2xl">
            login
          </button>
        </div>
      )}
    </nav>
  );
}
