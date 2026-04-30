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
            <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm mx-4">
                {/* Close Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#F9E8E8] flex items-center justify-center">
                        <X size={32} className="text-[#8B4D5C]" />
                    </div>
                </div>

                {/* Content */}
                <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
                    Are you sure?
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Once deleted, {itemCount === 1 ? "this item" : `${itemCount} items`} cannot be undone.
                </p>

                {/* Actions */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg bg-[#E5E0F5] text-[#54528F] font-medium hover:bg-[#D5D0E5] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-lg bg-[#C75D5D] text-white font-medium hover:bg-[#B54D4D] transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
