import SectionHeader from "./SectionHeader";

export default function AboutSection(){
    return (
        <section className="py-20 px-6 text-center">
            <SectionHeader>
                About WiCSM
            </SectionHeader>

            <p className="max-w-8xl mx-auto text-5xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 leading-[1.3] [color:#513c97]">
                WiCSM (Women in Computer Science, Statistics, and Mathematics) at UTSC was founded on a simple belief: when women in STEM feel supported and seen, they achieve beyond what they imagined.
            </p>

            <p className="max-w-8xl mx-auto text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed [color:#815dbb]">
                Our goal is to build that support system:<br/>
                one mentorship moment, one conversation, and one connection at a time.
            </p>
        </section>
    );
}