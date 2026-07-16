"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children, user }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#FDFCFF]">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader user={user} onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
