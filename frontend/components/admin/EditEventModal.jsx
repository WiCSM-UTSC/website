"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditEventModal({ isOpen, event, onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [signUpUrl, setSignUpUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageName, setImageName] = useState("");
    const [status, setStatus] = useState("Upcoming");

    useEffect(() => {
        if (event) {
            setTitle(event.title ?? "");
            setDate(event.date ?? "");
            setLocation(event.location ?? "");
            setSignUpUrl(event.signUpUrl ?? "");
            setDescription(event.description ?? "");
            setImageName(event.imageName ?? "");
            setStatus(event.status ?? "Upcoming");
        }
    }, [event, isOpen]);

    if (!isOpen || !event) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave?.({
            title: title.trim(),
            date: date || "xxxx/xx/xx",
            location: location.trim(),
            signUpUrl: signUpUrl.trim(),
            description: description.trim(),
            imageName,
            status: event?.status ?? status,
        });
        onClose?.();
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        setImageName(file ? file.name : "");
    };

    const handleClose = () => {
        onClose?.();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <div
                className="absolute inset-0 bg-black/20"
                onClick={handleClose}
            />

            <div className="relative bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-md md:max-w-lg mx-2 sm:mx-4 max-h-[92vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#54528F]">
                        Edit Event
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg text-gray-500 hover:bg-[#F9F7FF] hover:text-[#54528F] transition-colors"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-3 border border-[#E5E0F5] rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#54528F] mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter event location"
                            className="w-full px-4 py-3 border border-[#E5E0F5] rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#54528F] mb-2">
                            Sign Up URL
                        </label>
                        <input
                            type="url"
                            value={signUpUrl}
                            onChange={(e) => setSignUpUrl(e.target.value)}
                            placeholder="https://"
                            className="w-full px-4 py-3 border border-[#E5E0F5] rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#54528F] mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Enter event description"
                            className="w-full px-4 py-3 border border-[#E5E0F5] rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#54528F] mb-2">
                            Image Upload
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 border border-[#E5E0F5] rounded-lg text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-[#F9F7FF] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#54528F] hover:file:bg-[#EFEAFF] focus:outline-none focus:ring-2 focus:ring-[#54528F] focus:border-transparent"
                        />
                        {imageName && (
                            <p className="mt-2 text-xs text-[#54528F]">Selected: {imageName}</p>
                        )}
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end pt-3 sm:pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#E5E0F5] text-[#54528F] font-medium hover:bg-[#D5D0E5] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#54528F] text-white font-medium hover:bg-[#45407a] transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
