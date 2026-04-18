import Navbar from '@/components/Navbar';
import ContactHeader from '@/components/ContactHeader';
import GetInTouchSection from '@/components/GetInTouchSection';
import MapSection from '@/components/MapSection';
import JoinUsSection from '@/components/JoinUsSection';
import Footer from '@/components/Footer';

export default function ContactUsPage() {
    return (
        <div 
            className="min-h-screen"
            style={{
               background: 'linear-gradient(180deg, #E8E0FF 0%, #B8A9F0 5%, #C8E8FA 20%, #C8E8FA 100%)',
            }}
        >
            <div className="pt-4 px-4">
                <Navbar />
            </div>
            <ContactHeader title='Contact Us' subtitle="" />
            <GetInTouchSection />
            <MapSection />
            <JoinUsSection />
            <Footer />
        </div>
    )
}