import FlipCard from "./FlipCard";
import SectionHeader from "./global/SectionHeader";

const execTeamData = [
    {
        title: "Presidents",
        members: [
            {
                name: "Danielle Santos",
                position: "Co-President",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Josephine Tjhia",
                position: "Co-President",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            }
        ]
    },
    {
        title: "Marketing",
        members: [
            {
                name: "Vicky Zhong",
                position: "VP Marketing",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Krisha Patel",
                position: "Director of Graphics",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Maissara Said Bakar",
                position: "Director of Campus",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Conrad Mo",
                position: "Director of Socials",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Fareeha Noor",
                position: "Graphic Designer",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Kaitlyn Qian",
                position: "Graphic Designer",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            }
        ]
    },
    {
        title: "Finance",
        members: [
            {
                name: "Rayyan Anam",
                position: "VP Finance",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            }
        ]
    },
    {
        title: "Events",
        members: [
            {
                name: "Jennifer Huang",
                position: "VP Events",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Shangavi Muhunthan",
                position: "Event Coordinator",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Shubham Garg",
                position: "Event Coordinator",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Sylvia Xu",
                position: "Event Coordinator",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            }
        ]
    },
    {
        title: "Corporations",
        members: [
            {
                name: "Maanya Gupta",
                position: "Associate",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Kehu Li",
                position: "Associate",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Shubhra Rashmi",
                position: "Associate",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            }
        ]
    },
    {
        title: "Mentorship",
        members: [
            {
                name: "Arushi Bhatt",
                position: "VP Mentorship",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Kayleigh Doopan",
                position: "Associate",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            }
        ]
    },
    {
        title: "First Years",
        members: [
            {
                name: "Rose Gu",
                position: "First Year Rep",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Ire Oluyemi",
                position: "First Year Rep",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            },
            {
                name: "Thanusa Paskaran",
                position: "First Year Rep",
                description: "This person is super important for WiCSM. This person is super important for WiCSM.",
                imageUrl: "/IMG_1710.jpg",
            }
        ]
    }
];

export default function ExecutiveSection() {
    return (
        <section className="py-10 px-6 text-center">
            <div className="max-w-6xl mx-auto text-center">
                <SectionHeader>
                    Executive Team
                </SectionHeader>

                <p className="max-w-2xl mx-auto text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-20 [color:#513c97]">
                    Meet the amazing people at WiCSM!
                </p>

                {execTeamData.map((team) => {
                    const vpMembers = team.members.filter(m => m.position.includes("Vice President") || m.position.includes("Co-President") || m.position.includes("VP"));
                    const directorMembers = team.members.filter(m => m.position.includes("Director"));
                    const otherMembers = team.members.filter(m =>
                        !m.position.includes("Vice President") &&
                        !m.position.includes("Co-President") &&
                        !m.position.includes("VP") &&
                        !m.position.includes("Director")
                    );

                    return (
                        <div key={team.title} className="mb-20 flex flex-col items-center">
                            <h3 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 [color:#513c97]">
                                {team.title}
                            </h3>

                            {/* VPs/Co-Prez row */}
                            {vpMembers.length > 0 && (
                                <div className="w-full flex flex-wrap justify-center gap-20 mb-32">
                                    {vpMembers.map((member) => (
                                        <FlipCard
                                            key={member.name}
                                            name={member.name}
                                            position={member.position}
                                            description={member.description}
                                            imageUrl={member.imageUrl}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Directors row */}
                            {directorMembers.length > 0 && (
                                <div className="w-full flex flex-wrap justify-center gap-20 mb-32">
                                    {directorMembers.map((member) => (
                                        <FlipCard
                                            key={member.name}
                                            name={member.name}
                                            position={member.position}
                                            description={member.description}
                                            imageUrl={member.imageUrl}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Other Members row */}
                            {otherMembers.length > 0 && (
                                <div className="w-full flex flex-wrap justify-center gap-20 mb-28">
                                    {otherMembers.map((member) => (
                                        <FlipCard
                                            key={member.name}
                                            name={member.name}
                                            position={member.position}
                                            description={member.description}
                                            imageUrl={member.imageUrl}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}