"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/events", label: "EVENTS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative border-3 border-[#54528F] rounded-3xl flex items-center justify-between py-2 px-7 max-w-5xl mx-auto bg-white">
      
      {/* Logo */}
      <Image
        src="/wicsm_logo_transparent_1.png"
        alt="WiCSM Logo"
        width={40}
        height={40}
      />

      <div className="hidden md:flex flex-1 justify-center gap-20 font-semibold text-[#54528F] text-xl">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>

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
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}