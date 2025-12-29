import ContactHeader from './ContactHeader';
import GetInTouchSection from './GetInTouchSection';
import SendMessageSection from './SendMessageSection';
import MapSection from './MapSection';
import JoinUsSection from './JoinUsSection';

export default function ContactUsPage() {
    return (
        <main>
            <ContactHeader title = 'Contact Us' subtitle="We'd love to hear from you!" />
            <GetInTouchSection />
            <SendMessageSection />
            <MapSection />
            <JoinUsSection />
        </main>
    )
}