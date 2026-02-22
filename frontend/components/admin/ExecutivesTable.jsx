"use client";

import { useState } from "react";
import ExecutiveRow from "./ExecutiveRow";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AddExecButton from "./AddExecButton";
import DeleteButton from "./DeleteButton";

export default function ExecutivesTable({
    executives = [],
    onAddExecutive,
    onUpdateExecutive,
    onDeleteExecutives,
}) {
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [editingId, setEditingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedIds(new Set(executives.map((e) => e.id)));
        } else {
            setSelectedIds(new Set());
        }
    };

    const handleSelectOne = (id, checked) => {
        const newSelected = new Set(selectedIds);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        setSelectedIds(newSelected);
    };

    const handleEditStart = (id) => {
        setEditingId(id);
    };

    const handleEditCancel = () => {
        setEditingId(null);
    };

    const handleEditSave = (id, data) => {
        onUpdateExecutive?.(id, data);
        setEditingId(null);
    };

    const handleDeleteClick = () => {
        if (selectedIds.size > 0) {
            setShowDeleteModal(true);
        }
    };

    const handleDeleteConfirm = () => {
        onDeleteExecutives?.(Array.from(selectedIds));
        setSelectedIds(new Set());
        setShowDeleteModal(false);
    };

    const isAllSelected = executives.length > 0 && selectedIds.size === executives.length;
    const hasSelection = selectedIds.size > 0;

    return (
        <div className="bg-white rounded-xl border border-[#E5E0F5] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E0F5]">
                <h1 className="text-3xl font-bold text-[#54528F]">
                    Manage Executives
                </h1>
                <div className="flex items-center gap-4">
                    <AddExecButton onClick={onAddExecutive} />
                    <DeleteButton onClick={handleDeleteClick} disabled={!hasSelection} />
                </div>
            </div>

            {/* Table */}
            {executives.length > 0 ? (
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#F9F7FF] border-b border-[#E5E0F5]">
                            <th className="w-12 px-3"></th>
                            <th className="w-12 px-3 py-4">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="w-5 h-5 rounded border-[#D5D0E5] text-[#54528F] focus:ring-[#54528F]"
                                />
                            </th>
                            <th className="w-16 py-4 px-3 text-left text-2xl font-semibold text-[#54528F]">
                                No.
                            </th>
                            <th className="py-4 px-5 text-left text-2xl font-semibold text-[#54528F]">
                                Exec info
                            </th>
                            <th className="py-4 px-5 text-left text-2xl font-semibold text-[#54528F]">
                                Team
                            </th>
                            <th className="py-4 px-5 text-left text-2xl font-semibold text-[#54528F]">
                                Role
                            </th>
                            <th className="py-4 px-5 text-left text-2xl font-semibold text-[#54528F]">
                                Bio
                            </th>
                            <th className="py-4 px-5 w-24"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {executives.map((executive, index) => (
                            <ExecutiveRow
                                key={executive.id}
                                executive={executive}
                                rowNumber={index + 1}
                                isSelected={selectedIds.has(executive.id)}
                                onSelect={handleSelectOne}
                                isEditing={editingId === executive.id}
                                onEditStart={handleEditStart}
                                onEditCancel={handleEditCancel}
                                onEditSave={handleEditSave}
                                dragHandleProps={{}}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-24">
                    <p className="text-xl text-gray-400">No Exec added yet :(</p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                itemCount={selectedIds.size}
            />
        </div>
    );
}
