import SectionHeader from "@/components/SectionHeader";

export default function AboutSection(){
    return (
        <section className="py-20 px-6 text-center">
            <SectionHeader>
                About WiCSM
            </SectionHeader>

            <p className="mx-auto px-4 sm:px-6 md:px-8 lg:px-42 text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-12 leading-[1.3] [color:#513c97]">
                WiCSM (Women in Computer Science, Statistics, and Mathematics) at UTSC was founded on a simple belief: when women in STEM feel supported and seen, they achieve beyond what they imagined.
            </p>

            <p className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed [color:#815dbb]">
                Our goal is to build that support system:<br/>
                one mentorship moment, one conversation, and one connection at a time.
            </p>
        </section>
    );
}