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

export default function AdminSidebar({ isOpen, onClose }) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    w-72 lg:w-80 min-h-screen bg-[#F9F7FF] border-r border-[#E5E0F5] flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Logo */}
                <div className="p-4 lg:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                        <Image
                            src="/wicsm_logo_transparent_1.png"
                            alt="WiCSM Logo"
                            width={40}
                            height={40}
                            className="lg:w-12 lg:h-12 flex-shrink-0"
                        />
                        <span className="text-3xl lg:text-4xl font-bold text-[#54528F] truncate">
                            WiCSM
                        </span>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-[#54528F] hover:bg-[#E5E0F5] rounded-lg"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 lg:px-4 py-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-3 lg:py-4 rounded-lg mb-2 transition-colors ${
                                    isActive
                                        ? "bg-[#54528F] text-white"
                                        : "text-[#54528F] hover:bg-[#E5E0F5]"
                                }`}
                            >
                                <Icon size={24} className="lg:w-7 lg:h-7 flex-shrink-0" />
                                <span className="text-lg lg:text-xl font-medium truncate">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
