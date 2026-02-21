/**
 * Route: GET /api/events/past
 * Purpose: Return past events only.
 * Behavior:
 * - Validates Supabase anon credentials.
 * - Proxies to Supabase Edge Function events/past.
 * - Returns normalized events array with optional debug/error metadata.
 */
import { NextResponse } from "next/server";
import { fetchPastEvents } from "../service";
import {
  getSupabaseCredentials,
  hasMissingAnonCredentials,
} from "../../utils/supabase";

export async function GET() {
  try {
    const credentials = getSupabaseCredentials();

    if (hasMissingAnonCredentials(credentials)) {
      return NextResponse.json(
        { events: [], error: "Supabase credentials missing" },
        { status: 500 },
      );
    }

    const result = await fetchPastEvents(credentials);
    return NextResponse.json(
      {
        events: result.events || [],
        debug: result.debug,
        error: result.error,
      },
      { status: result.ok ? 200 : result.status },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ events: [], error: message }, { status: 500 });
  }
}
