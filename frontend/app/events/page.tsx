"use client";
import EventCard from "./EventCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorState from "@/components/ErrorState";
import EventSection from "./EventSection";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  image_url: string | null;
  signup_url: string | null;
};

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/events");
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          setError(
            "Unable to load events at this time. Please try again later.",
          );
          setUpcomingEvents([]);
          setPastEvents([]);
          setLoading(false);
          return;
        }
        if (!res.ok || data.error) {
          setError(
            "Unable to load events at this time. Please try again later.",
          );
          setUpcomingEvents([]);
          setPastEvents([]);
        } else {
          setUpcomingEvents(data.upcoming || []);
          setPastEvents(data.past || []);
        }
      } catch (err) {
        setError("Unable to load events at this time. Please try again later.");
        setUpcomingEvents([]);
        setPastEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFFFFF_0%,#D9D8F0_50%,#FFFFFF_100%)] pt-14">
      <Navbar />
      <main className="grow container mx-auto px-6 py-12 max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#513C97] mb-2">
            Events
          </h1>
          <p className="text-lg text-gray-600">
            Stay up to date with our latest events.
          </p>
        </header>
        {error ? (
          <ErrorState
            message={error}
            onRetry={() => window.location.reload()}
          />
        ) : (
          <>
            <EventSection
              isCurrent={true}
              events={upcomingEvents}
              loading={loading}
            />
            <EventSection
              isCurrent={false}
              events={pastEvents}
              loading={loading}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
