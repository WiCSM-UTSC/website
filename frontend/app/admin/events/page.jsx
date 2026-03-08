"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { AdminLayout, EventsTable } from "@/components/admin";

const STORAGE_KEY = "admin_events";

export default function ManageEventsPage() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const isInitialMount = useRef(true);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setEvents(Array.isArray(parsed) ? parsed : []);
            }
        } catch {
            // ignore parse errors
        }
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        } catch {
            // ignore quota errors
        }
    }, [events]);

    const handleAddEvent = (eventData) => {
        const newEvent = {
            id: Date.now(),
            title: eventData?.title ?? "Event title",
            date: eventData?.date ?? "xxxx/xx/xx",
            status: eventData?.status ?? "Upcoming",
        };
        setEvents([...events, newEvent]);
    };

    const handleUpdateEvent = (id, eventData) => {
        if (!eventData) return;
        setEvents(events.map((e) =>
            e.id === id ? { ...e, ...eventData } : e
        ));
    };

    const handleDeleteEvents = (ids) => {
        setEvents(events.filter((e) => !ids.includes(e.id)));
    };

    const filteredEvents = useMemo(() => {
        if (!searchQuery.trim()) return events;
        const q = searchQuery.trim().toLowerCase();
        return events.filter((e) =>
            (e.title ?? "").toLowerCase().startsWith(q)
        );
    }, [events, searchQuery]);

    return (
        <AdminLayout
            user={{ name: "Rachel" }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
        >
            <EventsTable
                events={filteredEvents}
                onAddEvent={handleAddEvent}
                onUpdateEvent={handleUpdateEvent}
                onDeleteEvents={handleDeleteEvents}
            />
        </AdminLayout>
    );
}
