import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md">  {/* Add a container */}
            <div className="flex items-center justify-between px-10 py-4">
                <div className="flex items-center gap-3">
                    <Image
                        src="/wicsm_logo_transparent_1.png"
                        alt="WiCSM Logo"
                        width={50}
                        height={50}
                    />
                    <p className="text-[#54528F] font-semibold text-2xl">WiCSM</p>
                </div>
                <div className="flex gap-8 text-[#54528F] font-semibold">
                    <Link href="/" className="hover:underline">HOME</Link>
                    <Link href="/about" className="hover:underline">ABOUT</Link>
                    <Link href="/events" className="hover:underline">EVENTS</Link>
                    <Link href="/contact" className="hover:underline">CONTACT</Link>
                </div>
                <button className="bg-[#54528F] text-white px-6 py-2 rounded hover:bg-[#674B91]">
                    LOGIN
                </button>
            </div>
        </nav>
    );
}