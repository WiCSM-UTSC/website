import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type EventData = {
  id: string;
  monthLabel: string;
  weekday: string;
  day: string;
  meta: string;
  title: string;
  description: string;
  posterSrc?: string;
  posterAlt?: string;
  titleLink?: string;
};

const EVENT_DATA: Record<string, EventData> = {
  "amr-youth-policy": {
    id: "amr-youth-policy",
    monthLabel: "SEPTEMBER 2025",
    weekday: "MON",
    day: "25",
    meta: "September 25 Location: IC Atrium @ 3:00 pm - 8:00 pm",
    title: "Event title",
    description:
      "Lorem ipsum dolor sit amet consectetur. Odio sit congue euismod viverra magna.\n\nMi consequat mattis urna condimentum orci. Urna neque magna massa bibendum. Erat pharetra nulla euismod in fames tellus eu.",
    posterSrc: undefined,
    posterAlt: "Event poster",
    titleLink: "#",
  },
};

const FALLBACK_EVENT: EventData = {
  id: "fallback",
  monthLabel: "SEPTEMBER 2025",
  weekday: "MON",
  day: "25",
  meta: "September 25 Location: IC Atrium @ 3:00 pm - 8:00 pm",
  title: "Event title",
  description:
    "Lorem ipsum dolor sit amet consectetur. Odio sit congue euismod viverra magna.\n\nMi consequat mattis urna condimentum orci. Urna neque magna massa bibendum. Erat pharetra nulla euismod in fames tellus eu.",
  posterSrc: undefined,
  posterAlt: "Event poster",
  titleLink: "#",
};

function getLocation(meta: string) {
  const match = meta.match(/Location:\s*(.*?)\s*@/i);
  return match?.[1]?.trim() || "location";
}

function getDateTimeLabel(event: EventData) {
  return `${event.weekday} ${event.day} - ${event.meta}`;
}

function EventImage({ src, alt }: { src?: string; alt: string }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={482}
        height={521}
        className="h-full w-full rounded-[30px] object-cover"
      />
    );
  }

  return (
    <div
      aria-label={alt}
      className="h-full w-full rounded-[30px] border border-[#EFE8FF] bg-[conic-gradient(from_45deg,#F4F4F4_0deg,#F4F4F4_90deg,#EAEAEA_90deg,#EAEAEA_180deg,#F4F4F4_180deg,#F4F4F4_270deg,#EAEAEA_270deg,#EAEAEA_360deg)] bg-size-[28px_28px]"
    />
  );
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = EVENT_DATA[id] ?? FALLBACK_EVENT;
  const locationLabel = getLocation(event.meta);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    locationLabel === "location"
      ? "University of Toronto Scarborough"
      : locationLabel,
  )}&output=embed`;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F7F3FF_0%,#DECDFF_38%,#FFFFFF_79%)]">
      <div className="mx-auto w-full max-w-[1240px] px-4 pb-12 pt-6 sm:px-6 md:pb-16 md:pt-8 lg:px-10 lg:pt-10">
        <Navbar />

        <main className="mt-14 md:mt-20">
          <section>
            <h1 className="text-[48px] font-bold leading-[0.95] tracking-[-0.72px] text-[#513C97] md:text-[64px]">
              {event.title}
            </h1>
            <p className="mt-2 text-xl font-semibold text-[#3F3F3F] md:text-2xl">
              {getDateTimeLabel(event)}
            </p>
          </section>

          <section className="mt-8 grid gap-10 md:mt-12 md:grid-cols-[482px_1fr] md:items-start md:gap-16">
            <div className="mx-auto h-[324px] w-full max-w-[300px] rounded-[30px] border-2 border-[rgba(98,12,242,0.25)] p-px shadow-[0_0_57px_0_#8DADED,0_0_33px_0_#EFD1FF,0_0_19px_0_#EFD1FF,0_0_9px_0_#EFD1FF,0_0_2.75px_0_#EFD1FF] md:mx-0 md:h-[521px] md:max-w-[482px]">
              <EventImage
                src={event.posterSrc}
                alt={event.posterAlt || `${event.title} cover`}
              />
            </div>

            <div className="max-w-[560px]">
              <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.72px] text-[#54528F] md:text-6xl">
                Description
              </h2>

              <p className="mt-6 whitespace-pre-line text-justify text-xl leading-normal text-[#3F3F3F] md:text-2xl">
                {event.description}
              </p>

              <div className="mt-8 flex items-center gap-4 md:mt-10 md:gap-6">
                <MapPin className="h-7 w-7 text-[#54528F] md:h-10 md:w-10" />
                <p className="text-xl font-semibold text-[#54528F] md:text-2xl">
                  {locationLabel}
                </p>
              </div>

              <Link
                href={event.titleLink || "#"}
                className="mt-8 inline-flex h-[62px] w-full max-w-[455px] items-center justify-center rounded-[35px] bg-[#54528F] px-10 text-2xl font-semibold text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-[#4A4884]"
              >
                Register now!
              </Link>
            </div>
          </section>

          <section className="mt-16 md:mt-24">
            <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.72px] text-[#54528F] md:text-6xl">
              Venue
            </h2>
            <p className="mt-2 text-xl font-medium text-[#3F3F3F] md:text-2xl">
              {locationLabel}
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
