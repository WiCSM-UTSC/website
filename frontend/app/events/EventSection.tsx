import { useEffect, useState } from "react";
import type { Event } from "./types";
import EventCard from "./EventCard";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import {
  EVENTS_PER_PAGE,
  getDateParts,
  getPaginatedEvents,
  getTotalPages,
} from "./utils";

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
  const [page, setPage] = useState(1);
  const [pageDirection, setPageDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const totalPages = getTotalPages(events, EVENTS_PER_PAGE);
  const paginatedEvents = getPaginatedEvents(events, page, EVENTS_PER_PAGE);

  useEffect(() => {
    setPage((prevPage) => Math.min(prevPage, totalPages));
  }, [totalPages]);

  const pageAnimationVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : direction * 20,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : direction * -20,
    }),
  };

  function updatePage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }

    setPageDirection(nextPage > page ? 1 : -1);
    setPage(nextPage);
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
          <>
            <LazyMotion features={domAnimation}>
              <AnimatePresence
                custom={pageDirection}
                mode="wait"
                initial={false}
              >
                <m.div
                  key={`${isCurrent ? "current" : "past"}-${page}`}
                  className="flex flex-col gap-10"
                  custom={pageDirection}
                  variants={pageAnimationVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: shouldReduceMotion ? 0.12 : 0.26,
                    ease: "easeOut",
                  }}
                >
                  {paginatedEvents.map((event) => {
                    const { monthLabel, weekday, day } = getDateParts(
                      event.date,
                    );

                    return (
                      <EventCard
                        key={event.id}
                        id={event.id}
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
                  })}
                </m.div>
              </AnimatePresence>
            </LazyMotion>

            {/* Pagination controls — only shown when more than one page */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  disabled={page <= 1}
                  onClick={() => updatePage(page - 1)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-[#D9D8F0] text-[#513C97] enabled:hover:bg-[#F2EEFF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => updatePage(num)}
                      className={`w-9 h-9 text-sm font-semibold rounded-lg transition-colors ${
                        num === page
                          ? "bg-[#513C97] text-white"
                          : "text-[#513C97] border border-[#D9D8F0] hover:bg-[#F2EEFF]"
                      }`}
                    >
                      {num}
                    </button>
                  ),
                )}

                <button
                  disabled={page >= totalPages}
                  onClick={() => updatePage(page + 1)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-[#D9D8F0] text-[#513C97] enabled:hover:bg-[#F2EEFF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
