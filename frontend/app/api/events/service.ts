/**
 * Events service layer.
 *
 * Purpose:
 * - Centralize all event data-access calls used by API routes.
 * - Keep route files focused on HTTP orchestration and status mapping.
 *
 * Notes:
 * - This service intentionally uses Supabase Edge Functions for event reads
 *   (`events/upcoming`, `events/past`, `events/:id`) to keep behavior consistent
 *   with backend function logic.
 * - Response parsing is defensive to support minor payload-shape differences
 *   between edge function handlers.
 */
import {
  requestSupabaseEdgeFunction,
  type SupabaseCredentials,
} from "../utils/supabase";

const EVENT_SELECT_FIELDS =
  "id,title,description,date,start_time,end_time,location,image_url,signup_url,created_at,updated_at";

type EventsTimeline = "upcoming" | "past";

/**
 * Fetches a single event by id through the Edge Function route.
 *
 * Expected successful payloads supported:
 * - `{ event: {...} }`
 * - `{ events: [{...}] }`
 * - direct object payload
 *
 * Returns a normalized result with `ok`, `status`, and either `event` or `error`.
 */
export async function fetchEventById(
  credentials: SupabaseCredentials,
  eventId: string,
) {
  const encodedId = encodeURIComponent(eventId);
  const { response, body } = await requestSupabaseEdgeFunction(
    credentials.url,
    `events/${encodedId}`,
    credentials.anonKey,
    { method: "GET" },
  );

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      error:
        (body as { error?: string; message?: string })?.error ||
        (body as { error?: string; message?: string })?.message ||
        "Failed to fetch event",
    };
  }

  const maybeObject = body as {
    event?: unknown;
    events?: unknown[];
  };

  const event =
    maybeObject?.event ||
    (Array.isArray(maybeObject?.events) ? maybeObject.events[0] : null) ||
    (Array.isArray(body) ? body[0] : body);

  if (!event) {
    return {
      ok: false as const,
      status: 404,
      error: "Event not found",
    };
  }

  return {
    ok: true as const,
    event,
  };
}

/**
 * Fetches events from one timeline bucket (`upcoming` or `past`) through
 * the Edge Function route and returns a normalized response contract.
 */
export async function fetchEventsByTimeline(
  credentials: SupabaseCredentials,
  timeline: EventsTimeline,
) {
  const { response, body } = await requestSupabaseEdgeFunction(
    credentials.url,
    `events/${timeline}`,
    credentials.anonKey,
  );

  return {
    ok: response.ok,
    status: response.status,
    events: body.events || [],
    debug: {
      status: response.status,
      body,
    },
    error: (body as { error?: string })?.error,
  };
}

/**
 * Convenience wrapper for fetching upcoming events.
 */
export async function fetchUpcomingEvents(credentials: SupabaseCredentials) {
  return fetchEventsByTimeline(credentials, "upcoming");
}

/**
 * Convenience wrapper for fetching past events.
 */
export async function fetchPastEvents(credentials: SupabaseCredentials) {
  return fetchEventsByTimeline(credentials, "past");
}
