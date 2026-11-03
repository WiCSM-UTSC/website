import { useState } from "react";

interface EventCardProps {
  date: number;
  description: string;
  href?: string;
  location: string;
  month: number;
  name: string;
  showMonthHeader?: boolean;
  thumbnailAlt?: string;
  thumbnailUrl?: string | null;
  time?: string;
  year: number;
}

const monthFormatter = new Intl.DateTimeFormat("en-CA", { month: "long", timeZone: "UTC" });
const weekdayFormatter = new Intl.DateTimeFormat("en-CA", { weekday: "short", timeZone: "UTC" });

export function EventCard({
  date,
  description,
  href,
  location,
  month,
  name,
  showMonthHeader = true,
  thumbnailAlt,
  thumbnailUrl,
  time,
  year,
}: EventCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const eventDate = new Date(Date.UTC(year, month - 1, date));
  const monthName = monthFormatter.format(eventDate);
  const weekday = weekdayFormatter.format(eventDate).replace(".", "").toUpperCase();
  const isoDate = eventDate.toISOString().slice(0, 10);

  const nameClasses =
    "text-lg font-bold leading-snug text-black underline decoration-1 underline-offset-2";

  return (
    <article className="rounded-2xl bg-white px-[clamp(20px,3.5vw,44px)] py-[clamp(24px,3.5vw,40px)] shadow-[0_3px_10px_rgb(57_13_103/8%)]">
      {showMonthHeader && (
        <div className="mb-7 flex items-center gap-4">
          <p className="m-0 shrink-0 text-xs font-medium tracking-wide text-black uppercase">
            {monthName} {year}
          </p>
          <div aria-hidden="true" className="h-px flex-1 bg-black" />
        </div>
      )}

      <div className="flex items-start gap-[clamp(20px,5vw,72px)] max-[760px]:flex-col max-[760px]:gap-5">
        <time
          className="flex w-14 shrink-0 flex-col items-center pt-1 text-sm leading-tight text-black max-[760px]:flex-row max-[760px]:w-auto max-[760px]:gap-1.5"
          dateTime={isoDate}
        >
          <span>{weekday}</span>
          <span>{date}</span>
        </time>

        <div className="min-w-0 flex-1 text-black">
          <p className="m-0 text-lg leading-snug">
            {monthName} {date} Location: {location}
            {time && <> @ {time}</>}
          </p>
          <h3 className="m-0">
            {href ? (
              <a
                className={`${nameClasses} hover:text-brand-button focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-text`}
                href={href}
                rel="noreferrer"
                target="_blank"
              >
                {name}
              </a>
            ) : (
              <span className={nameClasses}>{name}</span>
            )}
          </h3>
          <p className="mt-0.5 mb-0 text-lg leading-snug whitespace-pre-line">{description}</p>
        </div>

        {thumbnailUrl && !imageFailed && (
          <img
            alt={thumbnailAlt ?? `${name} poster`}
            className="aspect-square w-[clamp(160px,20vw,264px)] shrink-0 object-cover max-[760px]:w-full max-[760px]:max-w-80"
            loading="lazy"
            onError={() => setImageFailed(true)}
            src={thumbnailUrl}
          />
        )}
      </div>
    </article>
  );
}