"use client";

import { SquarePlus } from "lucide-react";

export default function AddEventButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-lg transition-colors text-base md:text-xl"
            style={{
                backgroundColor: "#FCFCFC",
                border: "1px solid #513C97",
                color: "#513C97",
                boxShadow: "0 2px 8px rgba(81, 60, 151, 0.25)",
            }}
        >
            <SquarePlus size={20} className="md:w-[22px] md:h-[22px] shrink-0" strokeWidth={2} />
            <span className="font-medium">Add Event</span>
        </button>
    );
}
