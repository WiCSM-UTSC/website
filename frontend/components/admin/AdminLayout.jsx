"use client";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children, user, searchQuery, onSearchChange }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#FDFCFF]">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader
                    user={user}
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
