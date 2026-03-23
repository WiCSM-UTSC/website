"use client";

import { useEffect, useState } from "react";
import FlipCard from "./FlipCard";
import SectionHeader from "./SectionHeader";

async function getExecs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/exec`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
    });
    if (!res.ok) throw new Error("Failed to fetch exec data");
    const data = await res.json();
    return data.execs;
}


const SECTION_CONFIG = [
    { title: "Presidents",   indexes: [[0, 1]] },
    { title: "Marketing",    indexes: [[2, 5]] },
    { title: "Finance",      indexes: [[6, 7]] },
    { title: "Events",       indexes: [[8, 11]] },
    { title: "Corporations", indexes: [[12, 14]] },
    { title: "Mentorship",   indexes: [[15, 17]] },
    { title: "First Years",  indexes: [[18, 20]] },
];

function indexInRanges(index, ranges) {
    return ranges.some(([start, end]) => index >= start && index <= end);
}

function groupExecs(execs) {
    const assignedIndexes = new Set();

    const sections = SECTION_CONFIG
        .map(({ title, indexes }) => {
            const members = execs.filter((_, i) => {
                if (indexInRanges(i, indexes)) {
                    assignedIndexes.add(i);
                    return true;
                }
                return false;
            });
            return { title, members };
        })
        .filter((s) => s.members.length > 0);

    // Catch-all: everyone not assigned to a named section
    const remaining = execs.filter((_, i) => !assignedIndexes.has(i));
    if (remaining.length > 0) {
        sections.push({ title: "Executive Team", members: remaining });
    }

    return sections;
}

function splitByRole(members) {
    const vp = members.filter(
        (m) =>
            m.role.includes("Vice President") ||
            m.role.includes("Co-President") ||
            m.role.includes("VP")
    );
    const director = members.filter((m) => m.role.includes("Director"));
    const other = members.filter(
        (m) =>
            !m.role.includes("Vice President") &&
            !m.role.includes("Co-President") &&
            !m.role.includes("VP") &&
            !m.role.includes("Director")
    );
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
                {error && <p className="text-red-500 text-xl">{error}</p>}

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