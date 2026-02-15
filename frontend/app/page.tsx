import ContactHeader from './contact-us/ContactHeader';
import GetInTouchSection from './contact-us/GetInTouchSection';
import MapSection from './contact-us/MapSection';
import JoinUsSection from './contact-us/JoinUsSection';

export default function ContactUsPage() {
    return (
        <main
            style={{
                background: 'linear-gradient(180deg, rgba(249, 246, 255, 0.2) 0%, #9BCEEE 44.37%, #F9F6FF 80.91%)',
                minHeight: '100vh'
            }}
        >
            <ContactHeader title = 'Contact Us' subtitle="" />
            <GetInTouchSection />
            <MapSection />
            <JoinUsSection />
        </main>
    )
}