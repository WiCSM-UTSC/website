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
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return new Response("Server misconfigured", { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const today = getTodayInToronto();
  console.log("[get-past-events] today (Toronto):", today);

  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, description, date, start_time, end_time, location, image_url, signup_url, created_at, updated_at",
    )
    .lt("date", today) 
    .order("date", { ascending: false });

  if (error) {
    console.error("get-past-events error", error);
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
