import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
    if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
      return NextResponse.json({
        upcoming: [],
        past: [],
        error: "Supabase credentials missing",
      });
    }
    const headers = {
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
    };

    // Fetch upcoming events
    const upcomingRes = await fetch(
      `${supabaseUrl}/functions/v1/events/upcoming`,
      {
        method: "GET",
        headers,
      },
    );
    const upcomingJson = await upcomingRes.json().catch(() => ({}));
    // console.log("upcomingRes status:", upcomingRes.status);
    // console.log("upcomingRes body:", upcomingJson);

    // Fetch past events
    const pastRes = await fetch(`${supabaseUrl}/functions/v1/events/past`, {
      method: "GET",
      headers,
    });
    const pastJson = await pastRes.json().catch(() => ({}));
    // console.log("pastRes status:", pastRes.status);
    // console.log("pastRes body:", pastJson);

    return NextResponse.json({
      upcoming: upcomingJson.events || [],
      past: pastJson.events || [],
      upcomingDebug: {
        status: upcomingRes.status,
        body: upcomingJson,
      },
      pastDebug: {
        status: pastRes.status,
        body: pastJson,
      },
    });
  } catch (err) {
    return NextResponse.json({
      upcoming: [],
      past: [],
      error: err?.message || "Unknown error",
    });
  }
}
