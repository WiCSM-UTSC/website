/**
 * EventCard Component
 *
 * Purpose:
 * - Displays event information in a card format
 * - Provides clickable navigation to event detail page
 * - Formats date information from ISO date string
 *
 * Notes:
 * - Automatically computes date parts (monthLabel, weekday, day) from event.date
 * - Links to `/events/{id}` for event detail view
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/app/events/types";
import { getDateParts } from "@/app/events/utils";
import "./EventCard.css";

type EventCardProps = Event;

function EventCard({
  id,
  title,
  description,
  date,
  location,
  image_url,
  signup_url,
}: EventCardProps) {
  const { monthLabel, weekday, day } = getDateParts(date);
  const meta = location ? `${date} Location: ${location}` : date;
  const posterSrc = image_url || "/globe.svg";

  return (
    <Link
      href={`/events/${id}`}
      className="event-card cursor-pointer hover:opacity-90 transition-opacity"
    >
      {/* Top month header */}
      <div className="event-card__header">
        <span className="event-card__month-label">{monthLabel}</span>
        <div className="event-card__divider" />
      </div>

      {/* Main content row */}
      <div className="event-card__body">
        {/* Left date column */}
        <div className="event-card__date-col">
          <span className="event-card__weekday">{weekday}</span>
          <span className="event-card__day">{day}</span>
        </div>

        {/* Text content */}
        <div className="event-card__content">
          <p className="event-card__meta">{meta}</p>

          {signup_url ? (
            <button
              type="button"
              className="event-card__title event-card__title--link"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(signup_url, "_blank", "noopener,noreferrer");
              }}
            >
              {title}
            </button>
          ) : (
            <p className="event-card__title">{title}</p>
          )}

          <p className="event-card__description line-clamp-3">
            {description || ""}
          </p>
        </div>

        {/* Poster on the right (optional) */}
        {posterSrc && (
          <div className="event-card__poster">
            <Image
              src={posterSrc}
              alt="Event poster"
              width={260}
              height={160}
              className="event-card__poster-image"
              unoptimized
            />
          </div>
        )}
      </div>
    </Link>
  );
}

export default EventCard;
