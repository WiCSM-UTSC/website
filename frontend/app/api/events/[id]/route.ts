/**
 * Route: GET /api/events/:id
 * Purpose: Return one event by its identifier.
 * Behavior:
 * - Validates Supabase service-role credentials.
 * - Reads the id from route params and fetches a single record.
 * - Returns 404 when the event is not found.
 */
import { NextResponse } from "next/server";
import { fetchEventById } from "../service";
import {
  getSupabaseCredentials,
  hasMissingServiceCredentials,
} from "../../utils/supabase";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const credentials = getSupabaseCredentials();

    if (hasMissingServiceCredentials(credentials)) {
      return NextResponse.json(
        { error: "Supabase credentials missing" },
        { status: 500 },
      );
    }

    const result = await fetchEventById(credentials, params.id);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    return NextResponse.json({ event: result.event });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
