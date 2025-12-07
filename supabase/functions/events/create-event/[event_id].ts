import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method != 'GET') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const eventId = url.pathname.split("/").pop();
  if (!eventId) {
    return new Response(
      JSON.stringify({ error: "Missing event_id in URL" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return new Response("Server misconfigured", { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    global: {
      headers: {
        Authorization: req.headers.get("Authorization") ?? "",
      },
    },
  });

  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, description, start_time, end_time, location, banner_url"
    )
    .eq("id", eventId)
    .single();
    
  if (error) {
    return new Response(
      JSON.stringify({ error: "Event not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ event: data }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
