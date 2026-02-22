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
        <aside className="w-80 min-h-screen bg-[#F9F7FF] border-r border-[#E5E0F5] flex flex-col">
            {/* Logo */}
            <div className="p-6 flex items-center gap-4">
                <Image
                    src="/wicsm_logo_transparent_1.png"
                    alt="WiCSM Logo"
                    width={48}
                    height={48}
                />
                <span className="text-5xl font-bold text-[#54528F] leading-none translate-y-1">WiCSM</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-5 py-4 rounded-lg mb-2 transition-colors ${
                                isActive
                                    ? "bg-[#54528F] text-white"
                                    : "text-[#54528F] hover:bg-[#E5E0F5]"
                            }`}
                        >
                            <Icon size={28} />
                            <span className="text-xl font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
