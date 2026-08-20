"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Calendar, X } from "lucide-react";

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

export default function AdminSidebar({ isOpen = false, onClose }) {
    const pathname = usePathname();

    return (
        <>
            {isOpen && onClose ? (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            ) : null}

            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-[#F9F7FF] border-r border-[#E5E0F5] flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 md:w-80 md:max-w-none md:min-h-screen md:border-b-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                {/* Logo */}
                <div className="p-3 sm:p-4 md:p-6 flex items-center justify-between gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                        <Image
                            src="/wicsm_logo_transparent_1.png"
                            alt="WiCSM Logo"
                            width={48}
                            height={48}
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0"
                        />
                        <span className="text-xl sm:text-3xl md:text-5xl font-bold text-[#54528F] leading-none translate-y-0.5 md:translate-y-1 truncate">
                            WiCSM
                        </span>
                    </div>

                    {onClose ? (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close menu"
                            className="md:hidden rounded-lg p-2 text-[#54528F] hover:bg-[#E5E0F5] transition-colors flex-shrink-0"
                        >
                            <X size={24} />
                        </button>
                    ) : null}
                </div>

                {/* Navigation */}
                <nav className="grid grid-cols-2 gap-2 px-3 pb-3 md:flex md:flex-col md:flex-initial md:px-4 md:py-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center justify-center md:justify-start gap-2 md:gap-4 px-2 sm:px-3 md:px-5 py-2.5 md:py-4 rounded-lg mb-0 md:mb-2 transition-colors ${
                                    isActive
                                        ? "bg-[#54528F] text-white"
                                        : "text-[#54528F] hover:bg-[#E5E0F5]"
                                }`}
                            >
                                <Icon size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                                <span className="text-xs sm:text-sm md:text-xl font-medium whitespace-nowrap">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
