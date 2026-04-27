import Navbar from '@/components/Navbar';
import AboutSection from '@/app/home/AboutSection';
import ExecutiveSection from '@/components/ExecutiveSection';
import Footer from '@/components/Footer';

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#F7F3FB_15%,#B1B0F2_49%,#F9F6FF_83%)] pt-14">
            <Navbar />
            <main className="min-h-screen">
                <AboutSection />
                <ExecutiveSection />
            </main>
            <Footer />
        </div>
    );
}
