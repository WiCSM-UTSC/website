"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Calendar } from "lucide-react";

const navItems = [
    {
        label: "Manage Executives",
        href: "/admin/executives",
        icon: Users,
    },
    {
        label: "Manage Events",
        href: "/admin/events",
        icon: Calendar,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full md:w-80 min-h-0 md:min-h-screen bg-[#F9F7FF] border-b md:border-b-0 md:border-r border-[#E5E0F5] flex flex-row md:flex-col">
            {/* Logo */}
            <div className="p-4 md:p-6 flex items-center gap-3 md:gap-4 flex-shrink-0">
                <Image
                    src="/wicsm_logo_transparent_1.png"
                    alt="WiCSM Logo"
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12"
                />
                <span className="text-3xl md:text-5xl font-bold text-[#54528F] leading-none translate-y-0.5 md:translate-y-1">WiCSM</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-row md:flex-col md:flex-initial px-2 md:px-4 py-2 overflow-x-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 md:gap-4 px-3 md:px-5 py-3 md:py-4 rounded-lg mb-0 md:mb-2 mr-2 md:mr-0 flex-shrink-0 transition-colors ${
                                isActive
                                    ? "bg-[#54528F] text-white"
                                    : "text-[#54528F] hover:bg-[#E5E0F5]"
                            }`}
                        >
                            <Icon size={24} className="md:w-7 md:h-7 shrink-0" />
                            <span className="text-sm md:text-xl font-medium whitespace-nowrap">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
