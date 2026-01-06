import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-3 border-[#54528F] rounded-3xl flex items-center py-2 px-7 max-w-5xl mx-auto">
            <Image
                src="/wicsm_logo_transparent_1.png"
                alt="WiCSM Logo"
                width={40}
                height={40}
                className="shrink-0"
            />
            <div className="flex-1 flex justify-center">
                <div className="flex gap-20 font-bold [color:#54528F] text-xl">
                    <Link href="/">HOME</Link>
                    <Link href="/about">ABOUT</Link>
                    <Link href="/events">EVENTS</Link>
                    <Link href="/contact">CONTACT</Link>
                </div>
            </div>
        </nav>
    )
}