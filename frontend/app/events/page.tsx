import EventCard from "./EventCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventSection from "./EventSection";

export default function EventsPage() {
  //Sample data for dev looking
  const events = [
    {
      monthLabel: "SEPTEMBER 2025",
      weekday: "MON",
      day: "25",
      meta: "September 25 Location: IC Atrium @ 3:00 pm - 8:00 pm",
      title:
        "Antimicrobial Resistance Across Canada: Youth Leading Change in Policy and Practice",
      description:
        "Join SCWIST, CanAMR Net, and EPIC on November 17 during National AMR Week for a special event hosted. Learn how to think like a recruiter with WiCSM x Bell! Listen to and network with a panel of tech professionals.",
      posterSrc: "/globe.svg",
    },
  ];

  //TODO: Add supabase call for past and current events, create event type and pass down into component
  //USE useEffect/suspene

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFFFFF_0%,#D9D8F0_50%,#FFFFFF_100%)] pt-14">
      <Navbar />
      <main className="grow container mx-auto px-4 py-8 max-w-6xl">
        <EventSection isCurrent={true} />
        <EventSection isCurrent={false} />
      </main>
      <Footer />
    </div>
  );
}
