import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-3 border-[#54528F] rounded-3xl flex items-center justify-between py-2 px-7 max-w-5xl mx-auto">
            <Image
                src="/wicsm_logo_transparent_1.png"
                alt="WiCSM Logo"
                width={40}
                height={40}
            />
            <div className="flex gap-20 font-semibold [color:#54528F] text-xl">
                <Link href="/">HOME</Link>
                <Link href="/about">ABOUT</Link>
                <Link href="/events">EVENTS</Link>
                <Link href="/contact">CONTACT</Link>
            </div>
            <button className="px-10 py-2 bg-[#F7F3FB] rounded-2xl font-semibold [color:#54528F] text-xl">login</button>
        </nav>
    )
}