import FlipCard from "./FlipCard";

const execTeam = [
    {
        name: "Jane Doe",
        position: "President",
        description: "Jane leads the team with a passion for technology and community building.",
        imageUrl: "/IMG_1710.jpg",
    }
];

export default function ExecutiveSection() {
    return (
        <section className="py-20 px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">
                Executive Team
            </h2>

            <p className="max-w-2xl mx-auto text-lg text-gray-700 mb-10">
                Meet the amazing people at WiCSM!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4x1 mx-auto">
                {execTeam.map((member) => (
                    <FlipCard
                        key={member.name}
                        name={member.name}
                        position={member.position}
                        description={member.description}
                        imageUrl={member.imageUrl}
                    />
                ))}
            </div>
        </section>
    );
}