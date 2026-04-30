"use client";

import { useState } from "react";
import { AdminLayout, ExecutivesTable } from "@/components/admin";

const mockExecutives = [
    {
        id: 1,
        name: "Name of the Exec",
        team: "Team Name",
        role: "Role of the Exec",
        bio: "Bio of the Exec is shown here when clicked",
        imageUrl: null,
    },
    {
        id: 2,
        name: "Name of the Exec",
        team: "Team Name",
        role: "Role of the Exec",
        bio: "Bio of the Exec is shown here when clicked",
        imageUrl: null,
    },
    {
        id: 3,
        name: "Name of the Exec",
        team: "Team Name",
        role: "Role of the Exec",
        bio: "Bio of the Exec is shown here when clicked",
        imageUrl: null,
    },
];

export default function ManageExecutivesPage() {
    const [executives, setExecutives] = useState(mockExecutives);

    const handleAddExecutive = () => {
        const newExec = {
            id: Date.now(),
            name: "",
            team: "",
            role: "",
            bio: "",
            imageUrl: null,
        };
        setExecutives([...executives, newExec]);
    };

    const handleUpdateExecutive = (id, data) => {
        setExecutives(
            executives.map((exec) =>
                exec.id === id ? { ...exec, ...data } : exec
            )
        );
    };

    const handleDeleteExecutives = (ids) => {
        setExecutives(executives.filter((exec) => !ids.includes(exec.id)));
    };

    return (
        <AdminLayout user={{ name: "Rachel" }}>
            <ExecutivesTable
                executives={executives}
                onAddExecutive={handleAddExecutive}
                onUpdateExecutive={handleUpdateExecutive}
                onDeleteExecutives={handleDeleteExecutives}
            />
        </AdminLayout>
    );
}
