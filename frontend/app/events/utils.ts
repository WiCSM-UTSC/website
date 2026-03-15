import type { Event } from "./types";

export const EVENTS_PER_PAGE = 5;

export function getDateParts(dateStr: string) {
  const [year, month, dayNum] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, dayNum);

  return {
    monthLabel: date
      .toLocaleString("default", { month: "long", year: "numeric" })
      .toUpperCase(),
    weekday: date.toLocaleString("default", { weekday: "short" }).toUpperCase(),
    day: date.getDate().toString(),
  };
}

export function getTotalPages(
  events: Event[],
  pageSize: number = EVENTS_PER_PAGE,
) {
  return Math.max(1, Math.ceil(events.length / pageSize));
}

export function getPaginatedEvents(
  events: Event[],
  page: number,
  pageSize: number = EVENTS_PER_PAGE,
) {
  return events.slice((page - 1) * pageSize, page * pageSize);
}
