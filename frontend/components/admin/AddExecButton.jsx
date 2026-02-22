"use client";

import { Plus } from "lucide-react";

export default function AddExecButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-3 px-5 py-3 border border-[#54528F] text-[#54528F] rounded-lg hover:bg-[#F5F3FF] transition-colors"
        >
            <Plus size={22} />
            <span className="text-xl font-semibold">Add Exec</span>
        </button>
    );
}
