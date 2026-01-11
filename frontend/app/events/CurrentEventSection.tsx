import EventCard from "./EventCard";

export default function CurrentEventSection() {
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
    <section className="mb-16">
      <h2 className="text-2xl md:text-5xl font-semibold text-[#513C97] mb-6">
        Current Events
      </h2>
      <div className="flex flex-col gap-10">
        {/* {currentEvents.map((events) => (
              <EventCard key={event.id} event={event} isCurrent={true} />
            ))} */}
        <EventCard
          monthLabel="SEPTEMBER 2025"
          weekday="MON"
          day="25"
          meta="September 25 Location: IC Atrium @ 3:00 pm - 8:00 pm"
          title="Antimicrobial Resistance Across Canada: Youth Leading Change in Policy and Practice"
          description="Join SCWIST, CanAMR Net, and EPIC on November 17 during National AMR Week for a special event hosted. Learn how to think like a recruiter with WiCSM x Bell! Listen to and network with a panel of tech professionals."
          posterSrc="/globe.svg"
        />
        <EventCard
          monthLabel="SEPTEMBER 2025"
          weekday="MON"
          day="25"
          meta="September 25 Location: IC Atrium @ 3:00 pm - 8:00 pm"
          title="Antimicrobial Resistance Across Canada: Youth Leading Change in Policy and Practice"
          description="Join SCWIST, CanAMR Net, and EPIC on November 17 during National AMR Week for a special event hosted. Learn how to think like a recruiter with WiCSM x Bell! Listen to and network with a panel of tech professionals."
          posterSrc="/globe.svg"
        />
        <EventCard
          monthLabel="SEPTEMBER 2025"
          weekday="MON"
          day="25"
          meta="September 25 Location: IC Atrium @ 3:00 pm - 8:00 pm"
          title="Antimicrobial Resistance Across Canada: Youth Leading Change in Policy and Practice"
          description="Join SCWIST, CanAMR Net, and EPIC on November 17 during National AMR Week for a special event hosted. Learn how to think like a recruiter with WiCSM x Bell! Listen to and network with a panel of tech professionals."
          posterSrc="/globe.svg"
        />
      </div>
    </section>
  );
}
