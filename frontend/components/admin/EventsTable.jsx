"use client";

import { useState } from "react";
import EventRow from "./EventRow";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import AddEventButton from "./AddEventButton";
import DeleteButton from "./DeleteButton";

export default function EventsTable({
    events = [],
    onAddEvent,
    onUpdateEvent,
    onDeleteEvents,
}) {
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedIds(new Set(events.map((e) => e.id)));
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

    const handleDeleteClick = () => {
        if (selectedIds.size > 0) {
            setShowDeleteModal(true);
        }
    };

    const handleDeleteConfirm = () => {
        onDeleteEvents?.(Array.from(selectedIds));
        setSelectedIds(new Set());
        setShowDeleteModal(false);
    };

    const isAllSelected =
        events.length > 0 && selectedIds.size === events.length;
    const hasSelection = selectedIds.size > 0;

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="bg-[#FDFCFF] rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 md:px-6 py-4 md:py-5 border-b border-[#E5E0F5] rounded-t-2xl">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#513C97]">
                        Manage Events
                    </h1>
                    <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                        <AddEventButton onClick={() => setShowAddModal(true)} />
                        <DeleteButton
                            onClick={handleDeleteClick}
                            disabled={!hasSelection}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-[rgba(86,56,188,0.14)] border-b border-[#D9D9D9]">
                            <th className="w-10 md:w-12 px-2 md:px-3 py-3 md:py-4 rounded-tl-2xl"></th>
                            <th className="w-10 md:w-12 px-2 md:px-3 py-3 md:py-4">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={(e) =>
                                        handleSelectAll(e.target.checked)
                                    }
                                    className="w-5 h-5 rounded border-[#D5D0E5] text-[#513C97] focus:ring-[#513C97]"
                                />
                            </th>
                            <th className="py-3 md:py-4 px-3 md:px-5 text-left text-lg md:text-2xl font-semibold text-[#513C97]">
                                Event Title
                            </th>
                            <th className="py-3 md:py-4 px-3 md:px-5 text-left text-lg md:text-2xl font-semibold text-[#513C97]">
                                Date
                            </th>
                            <th className="py-3 md:py-4 px-3 md:px-5 text-left text-lg md:text-2xl font-semibold text-[#513C97]">
                                Status
                            </th>
                            <th className="py-3 md:py-4 px-3 md:px-5 w-20 md:w-24 rounded-tr-2xl"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <EventRow
                                    key={event.id}
                                    event={event}
                                    isSelected={selectedIds.has(event.id)}
                                    onSelect={handleSelectOne}
                                    onEdit={(event) => setEditingEvent(event)}
                                    isLastRow={index === events.length - 1}
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-16 md:py-24 text-center text-2xl md:text-4xl font-medium rounded-b-2xl"
                                    style={{ color: "#513C97", opacity: 0.61 }}
                                >
                                    No Event added yet :(
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>

                <ConfirmDeleteModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteConfirm}
                    itemCount={selectedIds.size}
                />

                <AddEventModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onAdd={(eventData) => {
                        onAddEvent?.(eventData);
                        setShowAddModal(false);
                    }}
                />

                <EditEventModal
                    isOpen={!!editingEvent}
                    event={editingEvent}
                    onClose={() => setEditingEvent(null)}
                    onSave={(eventData) => {
                        if (editingEvent) {
                            onUpdateEvent?.(editingEvent.id, eventData);
                            setEditingEvent(null);
                        }
                    }}
                />
            </div>
        </div>
    );
}
