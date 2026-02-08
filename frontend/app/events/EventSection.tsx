import React from "react";
import { Event } from "./page";
import { FaRegCalendarAlt } from "react-icons/fa";

type EventSectionProps = {
  isCurrent: boolean;
  events: Event[];
  loading?: boolean;
};

export default function EventSection({
  isCurrent,
  events,
  loading,
}: EventSectionProps) {
  // Helper to format date and weekday
  function getDateParts(dateStr: string) {
    const date = new Date(dateStr);
    const monthLabel = date
      .toLocaleString("default", { month: "long", year: "numeric" })
      .toUpperCase();
    const weekday = date
      .toLocaleString("default", { weekday: "short" })
      .toUpperCase();
    const day = date.getDate().toString();
    return { monthLabel, weekday, day };
  }

  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-5xl font-semibold text-[#513C97] mb-6">
        {isCurrent ? "Current Events" : "Past Events"}
      </h2>
      <div className="flex flex-col gap-10">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#513C97] mr-4"></span>
            <span className="text-lg text-[#513C97] font-medium">
              Loading events...
            </span>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaRegCalendarAlt size={48} className="mb-2 text-[#513C97]" />
            <span className="text-lg text-[#513C97] font-medium">
              No events found.
            </span>
          </div>
        ) : (
          events.map((event) => {
            //Extract date information 
            const { monthLabel, weekday, day } = getDateParts(event.date);
            return (
              <EventCard
                key={event.id}
                monthLabel={monthLabel}
                weekday={weekday}
                day={day}
                meta={
                  event.location
                    ? `${event.date} Location: ${event.location}`
                    : event.date
                }
                title={event.title}
                description={event.description || ""}
                posterSrc={event.image_url || "/globe.svg"}
                titleLink={event.signup_url || undefined}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
