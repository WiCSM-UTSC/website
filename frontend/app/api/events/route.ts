/**
 * Route: GET /api/events
 * Purpose: Return both upcoming and past events in a single response.
 * Behavior:
 * - Validates required Supabase anon credentials.
 * - Fetches upcoming and past datasets in parallel.
 * - Returns combined payload with optional debug/error metadata.
 */
import { NextResponse } from "next/server";
import { fetchPastEvents, fetchUpcomingEvents } from "./service";
import {
  getSupabaseCredentials,
  hasMissingAnonCredentials,
} from "../utils/supabase";

export async function GET() {
  try {
    const credentials = getSupabaseCredentials();

    if (hasMissingAnonCredentials(credentials)) {
      return NextResponse.json(
        { upcoming: [], past: [], error: "Supabase credentials missing" },
        { status: 500 },
      );
    }

    const [upcomingResult, pastResult] = await Promise.all([
      fetchUpcomingEvents(credentials),
      fetchPastEvents(credentials),
    ]);

    const hasError = !upcomingResult.ok || !pastResult.ok;
    return NextResponse.json(
      {
        upcoming: upcomingResult.events || [],
        past: pastResult.events || [],
        // upcomingDebug: upcomingResult.debug,
        // pastDebug: pastResult.debug,
        error: upcomingResult.error || pastResult.error,
      },
      { status: hasError ? 500 : 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        upcoming: [],
        past: [],
        error: message,
      },
      { status: 500 },
    );
  }
}
