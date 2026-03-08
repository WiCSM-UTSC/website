"use client";

import { Search } from "lucide-react";

export default function AdminHeader({ user, searchQuery = "", onSearchChange }) {
    const initials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "U";

    return (
        <header className="h-14 md:h-16 bg-white border-b border-[#E5E0F5] flex items-center justify-between gap-3 px-4 md:px-6">
            {/* Search Bar */}
            <div className="relative w-56 sm:w-72 md:w-80">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#757575" }}
                />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery ?? ""}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg text-md focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent placeholder-[#757575]"
                    style={{ backgroundColor: "#EBEBEB", color: "#757575" }}
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
