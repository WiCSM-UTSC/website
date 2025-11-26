import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
console.info("update-event function started");
Deno.serve(async (req)=>{
  // Only allow PATCH
  if (req.method !== "PATCH") {
    return new Response("Method Not Allowed", {
      status: 405
    });
  }
  let body;
  try {
    body = await req.json();
  } catch (_err) {
    return new Response("Invalid JSON body", {
      status: 400
    });
  }
  const { id, title, date } = body;
  if (!id) {
    return new Response("Missing 'id' in request body", {
      status: 400
    });
  }
  // get Supabase credentials from env (these are set for you in Supabase)
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or key in env");
    return new Response("Server misconfigured", {
      status: 500
    });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  // build updates object only with provided fields
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (date !== undefined) updates.date = date;
  const { data, error } = await supabase.from("events").update(updates).eq("id", id).select().maybeSingle();
  if (error) {
    console.error("update-event error", error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  if (!data) {
    return new Response(JSON.stringify({
      error: "Event not found"
    }), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Connection": "keep-alive"
    }
  });
});
