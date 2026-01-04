import ContactHeader from './contact-us/ContactHeader';
import GetInTouchSection from './contact-us/GetInTouchSection';
import MapSection from './contact-us/MapSection';
import JoinUsSection from './contact-us/JoinUsSection';

export default function ContactUsPage() {
    return (
        <main>
            <ContactHeader title = 'Contact Us' subtitle="We'd love to hear from you!" />
            <GetInTouchSection />
            <MapSection />
            <JoinUsSection />
        </main>
    )
}