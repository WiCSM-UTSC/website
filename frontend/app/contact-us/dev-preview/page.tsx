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
                background: 'linear-gradient(180deg, rgba(249, 246, 255, 0.2) 0%, #9BCEEE 44.37%, #A9A7EB 80.91%)',
            }}
        >
            <Navbar />
            <ContactHeader title='Contact Us' subtitle="" />
            <GetInTouchSection />
            <MapSection />
            <JoinUsSection />
            <Footer />
        </div>
    )
}