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
        const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
        const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,};

        const upcomingRes = await fetch(
          `${baseUrl}/functions/v1/events/upcoming`,
          { headers }
        );

        const pastRes = await fetch(
          `${baseUrl}/functions/v1/events/past`,
          { headers }
        );

        const upcomingData = await upcomingRes.json();
        const pastData = await pastRes.json();

        setUpcomingEvents(upcomingData.events || []);
        setPastEvents(pastData.events || []);

      } catch (err) {
        // handle error
        console.log(err);
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
