import EventCard from "@/components/EventCard";


export default function EventsPage() {
 return (
   <main
     style={{
       display: "flex",
       justifyContent: "center",
       padding: "40px 0",
     }}
   >
     <EventCard
       monthLabel="SEPTEMBER 2025"
       weekday="MON"
       day="25"
       meta="September 25 Location: IC Atrium @ 3:00 pm - 8:00 pm"
       title="Antimicrobial Resistance Across Canada: Youth Leading Change in Policy and Practice"
       description="Join SCWIST, CanAMR Net, and EPIC on November 17 during National AMR Week for a special event hosted. Learn how to think like a recruiter with WiCSM x Bell! Listen to and network with a panel of tech professionals."
       posterSrc="/globe.svg"
     />
   </main>
 );
}
