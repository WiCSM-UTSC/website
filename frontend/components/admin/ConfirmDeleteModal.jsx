"use client";

import { X } from "lucide-react";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, itemCount = 1 }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
                {/* Close Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#F9E8E8] flex items-center justify-center">
                        <X size={32} className="text-[#C75D5D]" />
                    </div>
                </div>

                {/* Content */}
                <h2 className="text-xl font-semibold text-center text-[#54528F] mb-2">
                    Are you sure?
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Once deleted, {itemCount === 1 ? "this item" : `${itemCount} items`} cannot be undone.
                </p>

                {/* Actions */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-lg font-medium transition-colors border border-[#513C97] text-[#513C97] hover:bg-[#F5F3FF]"
                        style={{
                            backgroundColor: "#FCFCFC",
                            boxShadow: "0 2px 8px rgba(81, 60, 151, 0.15)",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-3 rounded-lg font-medium text-white transition-colors border-2 border-[#B54D4D] hover:bg-[#B54D4D]"
                        style={{
                            backgroundColor: "#C75D5D",
                            boxShadow: "0 2px 8px rgba(199, 93, 93, 0.25)",
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
