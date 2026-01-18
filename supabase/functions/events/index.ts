import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

console.info("events function started");

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
  const url = new URL(req.url);
  const path = url.pathname;

  if (path.endsWith("/past")) {
    if (req.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseAnonKey) {
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

    const { data, error } = await supabase
      .from("events")
      .select(
        "id, title, description, date, start_time, end_time, location, image_url, signup_url, created_at, updated_at",
      )
      .lt("date", today)
      .order("date", { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ events: data ?? [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method !== "PATCH") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const {
    id,
    title,
    description,
    date,
    start_time,
    end_time,
    location,
    image_url,
    signup_url,
  } = body;

  if (!id) {
    return new Response("Missing 'id' in request body", { status: 400 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    return new Response("Server misconfigured", { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const updates: any = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (date) updates.date = date;
  if (start_time) updates.start_time = start_time;
  if (end_time) updates.end_time = end_time;
  if (location) updates.location = location;
  if (image_url) updates.image_url = image_url;
  if (signup_url) updates.signup_url = signup_url;

  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!data) {
    return new Response(JSON.stringify({ error: "Event not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
