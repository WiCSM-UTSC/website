import Navbar from '@/components/global/Navbar';
import AboutSection from '@/components/AboutSection';
import ExecutiveSection from '@/components/ExecutiveSection';
import Footer from '@/components/global/Footer';

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#F7F3FB_15%,#B1B0F2_49%,#F9F6FF_83%)] pt-14">
            <main className="min-h-screen">
                <Navbar />
                <AboutSection />
                <ExecutiveSection />
                <Footer />
            </main>
        </div>
    );
}
