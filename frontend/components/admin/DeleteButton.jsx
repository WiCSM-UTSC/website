"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({ onClick, disabled = false }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 border-2 rounded-lg transition-colors text-base md:text-xl ${
                !disabled
                    ? "border-[#B54D4D] text-[#C75D5D] bg-[#FDFCFC] shadow-[0_4px_12px_rgba(181,77,77,0.25)] hover:bg-red-50 hover:shadow-[0_4px_14px_rgba(181,77,77,0.3)]"
                    : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
        >
            <Trash2 size={20} className="md:w-[22px] md:h-[22px] shrink-0" />
            <span className="font-semibold">Delete</span>
        </button>
    );
}
