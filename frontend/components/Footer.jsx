import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaDiscord, FaFacebook } from "react-icons/fa";

export default function Footer() {
    const socials = [
        { name: "Instagram", href: "#", icon: FaInstagram },
        { name: "Discord", href: "#", icon: FaDiscord },
        { name: "Facebook", href: "#", icon: FaFacebook },
    ];

    return (
        <footer className="bg-[linear-gradient(to_bottom,_#F9F6FF33_0%,_#F9F6FF33_10%,_#9BCEEE_35%,_#9BCEEE_45%,_#A9A7EB_75%,_#A9A7EB_100%)]">

            <div className="px-10 pt-32 pb-16">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/wicsm_logo_transparent_1.png"
                            alt="WiCSM Logo"
                            width={170}
                            height={170}
                            className="drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)]"
                        />

                        <div>
                            <p className="text-[#54528F] font-semibold text-8xl">WiCSM</p>
                            <p className="px-2 text-[#54528F] font-semibold text-lg">
                                Women in Computer Science, Statistics and <br />
                                Mathematics UTSC
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-3xl font-semibold text-white pr-40">
                        <a href="#" className="hover:underline">About Us </a>
                        <a href="#" className="hover:underline">Events </a>
                        <a href="#" className="hover:underline">Join Us </a>
                        <a href="#" className="hover:underline">Contact </a>
                    </div>
                </div>

                <div className="w-full h-[4px] bg-[#674B91] opacity-20 mt-4"></div>

                <div className="flex justify-between items-end">
                    <p className="text-white px-6 py-6 font-semibold text-1xl">
                        WiCSM @ 2026. All rights reserved.
                    </p>

                    <div className="flex gap-4 pr-10 pb-1">
                        {socials.map(({ name, href, icon: Icon }) => (
                            <Link
                                key={name}
                                href={href}
                                aria-label={name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-md p-2 hover:opacity-80 focus:ring-2 focus:ring-[#54528F]"
                            >
                                <Icon className="text-4xl text-white" />
                            </Link>
                        ))}

                        
                    </div>
                </div>

            </div>

        </footer> 
    )
}