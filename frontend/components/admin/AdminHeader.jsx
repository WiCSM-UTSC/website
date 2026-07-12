"use client";

import { Menu, Search } from "lucide-react";

export default function AdminHeader({
    user,
    searchQuery = "",
    onSearchChange,
    onMenuClick,
}) {
    const initials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "U";

    return (
        <header className="h-14 md:h-16 bg-white border-b border-[#E5E0F5] flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 md:px-6">
            <div className="flex items-center gap-2 min-w-0 flex-1">
                {onMenuClick ? (
                    <button
                        type="button"
                        onClick={onMenuClick}
                        aria-label="Open menu"
                        className="inline-flex md:hidden items-center justify-center w-9 h-9 rounded-lg text-[#54528F] hover:bg-[#E5E0F5] transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                ) : null}

                {/* Search Bar */}
                <div className="relative flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md">
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
                        className="w-full pl-10 pr-3 sm:pr-4 py-2 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent placeholder-[#757575]"
                        style={{ backgroundColor: "#EBEBEB", color: "#757575" }}
                    />
                </div>
            </div>

            {/* User Avatar */}
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E07A5F] flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                    {initials}
                </div>
            </div>
        </header>
    );
}
