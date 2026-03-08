"use client";

import { GripVertical, Pencil } from "lucide-react";

export default function EventRow({
    event,
    isSelected,
    onSelect,
    onEdit,
    isLastRow = false,
}) {
    return (
        <tr className="hover:bg-[#FDFCFF] transition-colors [&>td]:border-b [&>td]:border-[#D9D9D9]">
            <td className={`w-10 md:w-12 px-2 md:px-3 py-3 md:py-4 ${isLastRow ? "rounded-bl-2xl" : ""}`}>
                <GripVertical size={20} className="text-[#D5D0E5]" />
            </td>
            <td className="w-10 md:w-12 px-2 md:px-3 py-3 md:py-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect?.(event.id, e.target.checked)}
                    className="w-5 h-5 rounded border-[#D5D0E5] text-[#513C97] focus:ring-[#513C97]"
                />
            </td>
            <td className="py-3 md:py-4 px-3 md:px-5 text-base md:text-lg text-[#513C97]">
                {event.title}
            </td>
            <td className="py-3 md:py-4 px-3 md:px-5 text-base md:text-lg text-[#513C97]">
                {event.date}
            </td>
            <td className="py-3 md:py-4 px-3 md:px-5">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        event.status === "Upcoming"
                            ? "bg-[#E8F5E9] text-[#513C97]"
                            : "bg-[#F5F5F5] text-[#513C97]"
                    }`}
                >
                    {event.status}
                </span>
            </td>
            <td className={`py-3 md:py-4 px-3 md:px-5 w-20 md:w-24 text-right ${isLastRow ? "rounded-br-2xl" : ""}`}>
                <button
                    onClick={() => onEdit?.(event)}
                    className="p-2 rounded-lg text-[#513C97] hover:bg-[#F9F7FF] transition-colors"
                    aria-label="Edit event"
                >
                    <Pencil size={20} />
                </button>
            </td>
        </tr>
    );
}
