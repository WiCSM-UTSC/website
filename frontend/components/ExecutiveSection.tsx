"use client";

import { useEffect, useState } from "react";
import FlipCard from "./FlipCard";
import SectionHeader from "./SectionHeader";
import ErrorState from "./ErrorState";

async function getExecs() {
  const response = await fetch("/api/execs");
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch executive data");
  }

  if (!Array.isArray(data.execs)) {
    throw new Error("Executive data was returned in an invalid format");
  }

  return data.execs;
}

const SECTION_CONFIG = [
  { title: "Presidents", orderIndexes: [[1, 2]] },
  { title: "Marketing", orderIndexes: [[3, 11]] },
  { title: "Events", orderIndexes: [[12, 15]] },
  { title: "Corporations", orderIndexes: [[16, 18]] },
  { title: "Mentorship", orderIndexes: [[19, 20]] },
  { title: "Finance", orderIndexes: [[21, 21]] },
];

function orderIndexInRanges(orderIndex, ranges) {
  return ranges.some(
    ([start, end]) => orderIndex >= start && orderIndex <= end,
  );
}

function groupExecs(execs) {
  const assignedIds = new Set();

  const sections = SECTION_CONFIG.map(({ title, orderIndexes }) => {
    const members = execs.filter((member) => {
      if (orderIndexInRanges(member.order_index, orderIndexes)) {
        assignedIds.add(member.id);
        return true;
      }

      return false;
    });

    return {
      title,
      members,
    };
  }).filter((section) => section.members.length > 0);

  const remainingMembers = execs.filter(
    (member) => !assignedIds.has(member.id),
  );

  if (remainingMembers.length > 0) {
    sections.push({
      title: "Executive Team",
      members: remainingMembers,
    });
  }

  return sections;
}

function splitByRole(members) {
  const vicePresidents = members.filter((member) => {
    const role = member.role ?? "";

    return (
      role.includes("Vice President") ||
      role.includes("Co-President") ||
      role.includes("VP")
    );
  });

  const directors = members.filter((member) => {
    const role = member.role ?? "";
    return role.includes("Director");
  });

  const otherMembers = members.filter((member) => {
    const role = member.role ?? "";

    return (
      !role.includes("Vice President") &&
      !role.includes("Co-President") &&
      !role.includes("VP") &&
      !role.includes("Director")
    );
  });

  return {
    vicePresidents,
    directors,
    otherMembers,
  };
}

function MemberRow({ members }) {
  if (members.length === 0) {
    return null;
  }

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
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExecs() {
      try {
        setLoading(true);
        setError("");

        const execs = await getExecs();
        setExecTeamData(groupExecs(execs));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load executive data",
        );
      } finally {
        setLoading(false);
      }
    }

    loadExecs();
  }, []);

  return (
    <section className="py-10 px-6 text-center">
      <div className="max-w-6xl mx-auto text-center">
        <SectionHeader>Executive Team</SectionHeader>

        <p className="max-w-2xl mx-auto text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-20 [color:#513c97]">
          Meet the amazing people at WiCSM!
        </p>

        {loading && (
          <p className="text-gray-500 text-xl">
            Loading team...
          </p>
        )}

        {!loading && error && (
          <ErrorState message={error} />
        )}

        {!loading &&
          !error &&
          execTeamData.map((team) => {
            const {
              vicePresidents,
              directors,
              otherMembers,
            } = splitByRole(team.members);

            return (
              <div
                key={team.title}
                className="mb-20 flex flex-col items-center"
              >
                <h3 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 [color:#513c97]">
                  {team.title}
                </h3>

                <MemberRow members={vicePresidents} />
                <MemberRow members={directors} />
                <MemberRow members={otherMembers} />
              </div>
            );
          })}
      </div>
    </section>
  );
}