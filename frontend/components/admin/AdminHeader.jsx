"use client";

import { Search, Menu } from "lucide-react";

export default function AdminHeader({ user, onMenuClick }) {
    const initials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "U";

    return (
        <header className="h-14 lg:h-16 bg-white border-b border-[#E5E0F5] flex items-center justify-between px-4 lg:px-6 gap-4">
            {/* Mobile menu button */}
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 text-[#54528F] hover:bg-[#E5E0F5] rounded-lg flex-shrink-0"
            >
                <Menu size={24} />
            </button>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-xs lg:max-w-sm lg:flex-initial lg:w-64">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-[#F9F7FF] border border-[#E5E0F5] rounded-lg text-sm lg:text-md text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent"
                />
            </div>

            {/* User Avatar */}
            <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#E07A5F] flex items-center justify-center text-white font-semibold text-sm lg:text-base">
                    {initials}
                </div>
            </div>
        </header>
    );
}
