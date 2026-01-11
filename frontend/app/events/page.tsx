import EventCard from "./EventCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CurrentEventSection from "./CurrentEventSection";

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

  return (
    <div className="min-w-screen px-0 min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="grow container mx-auto px-4 py-8 max-w-6xl">
        <CurrentEventSection/>
      </main>
      <Footer/>
    </div>

    //  <main
    //    style={{
    //      display: "flex",
    //      justifyContent: "center",
    //      padding: "40px 0",
    //    }}
    //  >
    //    <EventCard
    //      monthLabel="SEPTEMBER 2025"
    //      weekday="MON"
    //      day="25"
    //      meta="September 25 Location: IC Atrium @ 3:00 pm - 8:00 pm"
    //      title="Antimicrobial Resistance Across Canada: Youth Leading Change in Policy and Practice"
    //      description="Join SCWIST, CanAMR Net, and EPIC on November 17 during National AMR Week for a special event hosted. Learn how to think like a recruiter with WiCSM x Bell! Listen to and network with a panel of tech professionals."
    //      posterSrc="/globe.svg"
    //    />
    //  </main>
  );
}
