/**
 * Event Detail Page
 *
 * Purpose:
 * - Displays detailed information for a specific event
 * - Fetches event data from API based on URL parameter
 * - Shows event description, venue map, and registration link
 *
 * Notes:
 * - Route: /events/{id} where id is the event.id
 * - Fetches data client-side via /api/events/:id
 */

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorState from "@/components/ErrorState";
import EventImage from "@/app/events/components/EventImage";
import type { Event } from "@/app/events/types";
import { getDateParts } from "@/app/events/utils";

type EventResponse = {
  event?: Event;
  error?: string;
};

async function fetchEventById(eventId: string): Promise<Event> {
  const response = await fetch(`/api/events/${eventId}`);
  const data = (await response
    .json()
    .catch(() => null)) as EventResponse | null;

  if (!response.ok || !data?.event) {
    throw new Error(data?.error || "Failed to fetch event");
  }

  return data.event;
}

function getLocation(location: string | null): string {
  return location?.trim() || "University of Toronto Scarborough";
}

export default function EventDetailPage() {
  const params = useParams();
  const eventId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  //use effect for client side loading event using id 
  useEffect(() => {
    if (!eventId) {
      setError("Missing event id");
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadEvent() {
      try {
        const eventData = await fetchEventById(eventId);
        if (isMounted) {
          setEvent(eventData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load event");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    setLoading(true);
    loadEvent();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#F7F3FF_0%,#DECDFF_38%,#FFFFFF_79%)]">
        <div className="mx-auto w-full max-w-[1240px] px-4 pb-12 pt-6 sm:px-6 md:pb-16 md:pt-8 lg:px-10 lg:pt-10">
          <Navbar />
          <main className="mt-14 md:mt-20">
            <div className="flex items-center justify-center py-16 text-lg text-[#513C97]">
              Loading event...
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#F7F3FF_0%,#DECDFF_38%,#FFFFFF_79%)]">
        <div className="mx-auto w-full max-w-[1240px] px-4 pb-12 pt-6 sm:px-6 md:pb-16 md:pt-8 lg:px-10 lg:pt-10">
          <Navbar />
          <main className="mt-14 md:mt-20">
            <ErrorState
              message="Event not found"
              subtitle="The event you're looking for doesn't exist or has been removed."
            />
            <div className="mt-8 text-center">
              <Link
                href="/events"
                className="inline-flex h-[62px] rounded-[35px] bg-[#54528F] px-10 text-xl items-center  font-semibold text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-[#4A4884]"
              >
                Back to Events
              </Link>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  const { monthLabel, weekday, day } = getDateParts(event.date);
  const location = getLocation(event.location);
  const dateTimeLabel = `${weekday} ${day} - ${monthLabel} @ ${event.start_time || "TBA"}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
  const posterSrc = event.image_url || undefined;

  //successful path - event detail page 
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F7F3FF_0%,#DECDFF_38%,#FFFFFF_79%)]">
      <div className="mx-auto w-full max-w-[1240px] px-4 pb-12 pt-6 sm:px-6 md:pb-16 md:pt-8 lg:px-10 lg:pt-10">
        <Navbar />

        <main className="mt-14 md:mt-20">

          {/* main title */}
          <section>
            <h1 className="text-[48px] font-bold leading-[0.95] tracking-[-0.72px] text-[#513C97] md:text-[64px]">
              {event.title}
            </h1>
            <p className="mt-2 text-xl font-semibold text-[#3F3F3F] md:text-2xl">
              {dateTimeLabel}
            </p>
          </section>

          {/* event details - image, desc, location and registration */}
          <section className="mt-8 grid gap-10 md:mt-12 md:grid-cols-[482px_1fr] md:items-start md:gap-16">
            <div className="mx-auto h-[324px] w-full max-w-[300px] rounded-[30px] border-2 border-[rgba(98,12,242,0.25)] p-px shadow-[0_0_57px_0_#8DADED,0_0_33px_0_#EFD1FF,0_0_19px_0_#EFD1FF,0_0_9px_0_#EFD1FF,0_0_2.75px_0_#EFD1FF] md:mx-0 md:h-[521px] md:max-w-[482px]">
              <EventImage src={posterSrc} alt={`${event.title} cover`} />
            </div>

            <div className="w-full md:max-w-[560px]">
              <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.72px] text-[#54528F] md:text-6xl">
                Description
              </h2>

              <p className="mt-6 whitespace-pre-line text-justify text-sm leading-normal text-[#3F3F3F] md:text-[1rem]">
                {event.description ||
                  "No description available for this event."}
              </p>

              <div className="mt-8 flex items-center gap-4 md:mt-10 md:gap-6">
                <MapPin className="h-8 w-8 shrink-0 text-[#54528F] md:h-10 md:w-10" />
                <p className="text-base font-semibold text-[#54528F] md:text-2xl">
                  {location}
                </p>
              </div>

              {event.signup_url && (
                <Link
                  href={event.signup_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex h-[62px] w-full items-center justify-center rounded-[35px] bg-[#54528F] px-10 text-xl font-semibold text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-[#4A4884] md:text-2xl"
                >
                  Register now!
                </Link>
              )}
            </div>
          </section>

          <section className="mt-16 md:mt-24">
            <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.72px] text-[#54528F] md:text-6xl">
              Venue
            </h2>
            <p className="mt-2 text-xl font-medium text-[#3F3F3F] md:text-2xl">
              {location}
            </p>

            <div className="mt-6 mx-auto w-fit overflow-hidden md:mt-10 md:max-w-[861px] md:w-full">
              <iframe
                title={`${event.title} map`}
                src={mapSrc}
                className="mx-auto block h-[309px] w-[288px] max-w-full md:h-[430px] md:w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
