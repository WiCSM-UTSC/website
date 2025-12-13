import AboutSection from "@/components/AboutSection";
import ExecutiveSection from "@/components/ExecutiveSection";
import FlipCard from "@/components/FlipCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DevPreview() {
    return (
        <main className="p-10 space-y-16">

            <section className="border p-6 rounded-x1">
                <AboutSection />
            </section>

            <section className="border p-6 rounded-x1">
                <ExecutiveSection />
            </section>
            
            <Navbar />


            <Footer />

        </main>
    );
}