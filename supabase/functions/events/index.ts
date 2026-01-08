import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function getTodayInToronto(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(now); 
}

Deno.serve(async (req) => {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return new Response("Server misconfigured", { status: 500 });
  }


  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: req.headers.get("Authorization") ?? "",
      },
    },
  });

  const today = getTodayInToronto();
  console.log("[get-upcoming-events] today (Toronto):", today);

  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, description, date, start_time, end_time, location, image_url, signup_url, created_at, updated_at",
    )
    .gte("date", today) 
    .order("date", { ascending: true });

  if (error) {
    console.error("get-upcoming-events error", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ events: data ?? [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
