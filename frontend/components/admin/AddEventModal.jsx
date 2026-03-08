"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AddEventModal({ isOpen, onClose, onAdd }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Upcoming");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd?.({
            title: title.trim(),
            date: date || "xxxx/xx/xx",
            status,
        });
        setTitle("");
        setDate("");
        setStatus("Upcoming");
        onClose?.();
    };

    const handleClose = () => {
        setTitle("");
        setDate("");
        setStatus("Upcoming");
        onClose?.();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/20"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[#54528F]">
                        Add Event
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg text-gray-500 hover:bg-[#F9F7FF] hover:text-[#54528F] transition-colors"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#54528F] mb-2">
                            Event Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter event title"
                            className="w-full px-4 py-3 border border-[#E5E0F5] rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#54528F] mb-2">
                            Date
                        </label>
                        <input
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="xxxx/xx/xx"
                            className="w-full px-4 py-3 border border-[#E5E0F5] rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#54528F] mb-2">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-3 border border-[#E5E0F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent bg-white"
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Past">Past</option>
                        </select>
                    </div>

                    <div className="flex gap-3 justify-end pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2 rounded-lg bg-[#E5E0F5] text-[#54528F] font-medium hover:bg-[#D5D0E5] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-[#54528F] text-white font-medium hover:bg-[#45407a] transition-colors"
                        >
                            Add Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
