"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { GripVertical, Edit2, Save, X, Plus, Upload, Camera } from "lucide-react";

export default function ExecutiveRow({
    executive,
    rowNumber,
    isSelected,
    onSelect,
    isEditing,
    onEditStart,
    onEditCancel,
    onEditSave,
    dragHandleProps,
}) {
    const [editData, setEditData] = useState({
        name: executive.name,
        team: executive.team,
        role: executive.role,
        bio: executive.bio,
        imageUrl: executive.imageUrl,
    });
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showBioModal, setShowBioModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [mounted, setMounted] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setEditData({ ...editData, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
            setShowUploadModal(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setEditData({ ...editData, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
            setShowUploadModal(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSave = () => {
        onEditSave(executive.id, editData);
    };

    const handleCancel = () => {
        setEditData({
            name: executive.name,
            team: executive.team,
            role: executive.role,
            bio: executive.bio,
            imageUrl: executive.imageUrl,
        });
        setPreviewImage(null);
        onEditCancel();
    };

    const truncateBio = (bio, maxLength = 30) => {
        if (!bio || bio.length <= maxLength) return bio;
        return bio.substring(0, maxLength) + "...";
    };

    return (
        <>
        <tr className={`border-b border-[#E5E0F5] ${isSelected ? "bg-[#F5F3FF]" : "hover:bg-[#FDFCFF]"}`}>
            {/* Drag Handle */}
            <td className="w-12 px-3 py-5">
                <div
                    {...dragHandleProps}
                    className="cursor-grab text-gray-400 hover:text-gray-600"
                >
                    <GripVertical size={24} />
                </div>
            </td>

            {/* Checkbox */}
            <td className="w-12 px-3 py-5">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect(executive.id, e.target.checked)}
                    className="w-5 h-5 rounded border-[#D5D0E5] text-[#54528F] focus:ring-[#54528F]"
                />
            </td>

            {/* Row Number */}
            <td className="w-16 py-5 px-3 text-2xl text-gray-500">
                {rowNumber}.
            </td>

            {/* Exec Info (Avatar + Name) */}
            <td className="py-5 px-5">
                <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-lg bg-[#E5E0F5] overflow-hidden flex-shrink-0">
                        {(previewImage || editData.imageUrl) ? (
                            <Image
                                src={previewImage || editData.imageUrl}
                                alt={executive.name}
                                width={56}
                                height={56}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#54528F] text-2xl font-medium">
                                {executive.name?.charAt(0) || "?"}
                            </div>
                        )}
                        {/* Plus overlay when editing */}
                        {isEditing && (
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
                            >
                                <Plus size={24} className="text-white" />
                            </button>
                        )}
                    </div>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="flex-1 px-4 py-2 border border-[#D5D0E5] rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-[#54528F]"
                            placeholder="Name"
                        />
                    ) : (
                        <span className="text-xl font-medium text-[#54528F]">
                            {executive.name}
                        </span>
                    )}
                </div>
            </td>

            {/* Team */}
            <td className="py-5 px-5">
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.team}
                        onChange={(e) => setEditData({ ...editData, team: e.target.value })}
                        className="w-full px-4 py-2 border border-[#D5D0E5] rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-[#54528F]"
                        placeholder="Team"
                    />
                ) : (
                    <span className="text-xl text-gray-600">{executive.team}</span>
                )}
            </td>

            {/* Role */}
            <td className="py-5 px-5">
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.role}
                        onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                        className="w-full px-4 py-2 border border-[#D5D0E5] rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-[#54528F]"
                        placeholder="Role"
                    />
                ) : (
                    <span className="text-xl text-gray-600">{executive.role}</span>
                )}
            </td>

            {/* Bio */}
            <td className="py-5 px-5">
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        className="w-full px-4 py-2 border border-[#D5D0E5] rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-[#54528F]"
                        placeholder="Bio"
                    />
                ) : (
                    <button
                        onClick={() => setShowBioModal(true)}
                        className="text-xl text-gray-500 hover:text-[#54528F] hover:underline text-left cursor-pointer transition-colors"
                    >
                        {truncateBio(executive.bio)}
                    </button>
                )}
            </td>

            {/* Actions */}
            <td className="py-5 px-5 w-24">
                {isEditing ? (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                            <Save size={22} />
                        </button>
                        <button
                            onClick={handleCancel}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <X size={22} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => onEditStart(executive.id)}
                        className="p-2 text-[#54528F] hover:bg-[#E5E0F5] rounded-lg transition-colors"
                    >
                        <Edit2 size={22} />
                    </button>
                )}
            </td>

        </tr>

            {/* Upload Photo Modal - rendered via portal */}
            {mounted && showUploadModal && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl p-6 w-[400px] max-w-[90vw] shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-[#54528F]">Upload Profile Photo</h3>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="border-2 border-dashed border-[#54528F] rounded-xl p-8 text-center cursor-pointer hover:bg-[#F5F3FF] transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-[#E5E0F5] flex items-center justify-center">
                                    <Camera size={28} className="text-[#54528F]" />
                                </div>
                                <div>
                                    <p className="text-[#54528F] font-medium">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="flex-1 px-4 py-2 border border-[#D5D0E5] text-[#54528F] rounded-lg hover:bg-[#F5F3FF] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 px-4 py-2 bg-[#54528F] text-white rounded-lg hover:bg-[#433F7A] transition-colors flex items-center justify-center gap-2"
                            >
                                <Upload size={16} />
                                Browse Files
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Bio Modal - rendered via portal */}
            {mounted && showBioModal && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl p-6 w-[500px] max-w-[90vw] shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-[#54528F]">{executive.name}</h3>
                            <button
                                onClick={() => setShowBioModal(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {executive.bio || "No bio available."}
                        </p>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
