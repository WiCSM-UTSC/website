"use client";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children, user }) {
    return (
        <div className="flex min-h-screen bg-[#FDFCFF]">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader user={user} />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
