"use client";

import { Search } from "lucide-react";

export default function AdminHeader({ user }) {
    const initials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "U";

    return (
        <header className="h-16 bg-white border-b border-[#E5E0F5] flex items-center justify-between px-6">
            {/* Search Bar */}
            <div className="relative w-64">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-[#F9F7FF] border border-[#E5E0F5] rounded-lg text-md focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent"
                />
            </div>

            {/* User Avatar */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E07A5F] flex items-center justify-center text-white font-semibold">
                    {initials}
                </div>
            </div>
        </header>
    );
}
