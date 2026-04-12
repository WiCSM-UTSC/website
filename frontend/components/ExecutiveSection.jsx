"use client";

import { useEffect, useState } from "react";
import FlipCard from "./FlipCard";
import SectionHeader from "./SectionHeader";
import ErrorState from "./ErrorState";

async function getExecs() {
    const res = await fetch("/api/execs");
    if (!res.ok) throw new Error("Failed to fetch exec data");
    const data = await res.json();
    return data.execs;
}

const SECTION_CONFIG = [
    { title: "Presidents",   orderIndexes: [[1, 2]] },
    { title: "Marketing",    orderIndexes: [[3, 11]] },
    { title: "Events",       orderIndexes: [[12, 15]] },
    { title: "Corporations", orderIndexes: [[16, 18]] },
    { title: "Mentorship",   orderIndexes: [[19, 20]] },
    { title: "Finance",      orderIndexes: [[21, 21]] },
];

function orderIndexInRanges(orderIndex, ranges) {
    return ranges.some(([start, end]) => orderIndex >= start && orderIndex <= end);
}

function groupExecs(execs) {
    const assignedIds = new Set();

    const sections = SECTION_CONFIG
        .map(({ title, orderIndexes }) => {
            const members = execs.filter((m) => {
                if (orderIndexInRanges(m.order_index, orderIndexes)) {
                    assignedIds.add(m.id);
                    return true;
                }
                return false;
            });
            return { title, members };
        })
        .filter((s) => s.members.length > 0);

    const remaining = execs.filter((m) => !assignedIds.has(m.id));
    if (remaining.length > 0) {
        sections.push({ title: "Executive Team", members: remaining });
    }

    return sections;
}

function splitByRole(members) {
    const vp = members.filter((m) => {
        const role = m.role ?? "";
        return (
            role.includes("Vice President") ||
            role.includes("Co-President") ||
            role.includes("VP")
        );
    });
    const director = members.filter((m) => {
        const role = m.role ?? "";
        return role.includes("Director");
    });
    const other = members.filter((m) => {
        const role = m.role ?? "";
        return (
            !role.includes("Vice President") &&
            !role.includes("Co-President") &&
            !role.includes("VP") &&
            !role.includes("Director")
        );
    });
    return { vp, director, other };
}

function MemberRow({ members }) {
    if (!members.length) return null;
    return (
        <div className="w-full flex flex-wrap justify-center gap-20 mb-32">
            {members.map((member) => (
                <FlipCard
                    key={member.id}
                    name={member.name}
                    position={member.role}
                    description={member.bio}
                    imageUrl={member.image_url}
                />
            ))}
        </div>
    );
}

export default function ExecutiveSection() {
    const [execTeamData, setExecTeamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getExecs()
            .then((execs) => setExecTeamData(groupExecs(execs)))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="py-10 px-6 text-center">
            <div className="max-w-6xl mx-auto text-center">
                <SectionHeader>Executive Team</SectionHeader>

                <p className="max-w-2xl mx-auto text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-20 [color:#513c97]">
                    Meet the amazing people at WiCSM!
                </p>

                {loading && <p className="text-gray-500 text-xl">Loading team...</p>}
                {error && (
                    <ErrorState/>
                )}

                {!loading &&
                    !error &&
                    execTeamData.map((team) => {
                        const { vp, director, other } = splitByRole(team.members);
                        return (
                            <div key={team.title} className="mb-20 flex flex-col items-center">
                                <h3 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 [color:#513c97]">
                                    {team.title}
                                </h3>

                                <MemberRow members={vp} />
                                <MemberRow members={director} />
                                <MemberRow members={other} />
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}