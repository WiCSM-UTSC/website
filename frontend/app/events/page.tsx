"use client";
import EventCard from "./EventCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const res = await fetch("/api/events");
        // console.log("/api/events response status:", res.status);
        const text = await res.text();
        // console.log("/api/events raw response:", text);
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          console.log("Failed to parse JSON:", parseErr);
          setUpcomingEvents([]);
          setPastEvents([]);
          return;
        }
        // console.log("Parsed events data:", data);
        setUpcomingEvents(data.upcoming || []);
        setPastEvents(data.past || []);
      } catch (err) {
        // console.log("fetchEvents error:", err);
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
      <main className="grow container mx-auto px-4 py-8 max-w-6xl">
        <EventSection
          isCurrent={true}
          events={upcomingEvents}
          loading={loading}
        />
        <EventSection isCurrent={false} events={pastEvents} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}
