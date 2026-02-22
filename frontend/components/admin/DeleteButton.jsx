"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({ onClick, disabled = false }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-3 px-5 py-3 border rounded-lg transition-colors ${
                !disabled
                    ? "border-[#C75D5D] text-[#C75D5D] hover:bg-red-50"
                    : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
        >
            <Trash2 size={22} />
            <span className="text-xl font-semibold">Delete</span>
        </button>
    );
}
