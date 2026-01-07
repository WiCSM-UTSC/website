import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

console.info("update-event function started");

Deno.serve(async (req) => {
  if (req.method !== "PATCH") {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }

  let body;
  try {
    body = await req.json();
  } catch (_err) {
    return new Response("Invalid JSON body", {
      status: 400,
    });
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
    return new Response("Missing 'id' in request body", {
      status: 400,
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env");
    return new Response("Server misconfigured", {
      status: 500,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const updates: {
    title?: string;
    description?: string;
    date?: string;
    start_time?: string;
    end_time?: string;
    location?: string;
    image_url?: string;
    signup_url?: string;
  } = {};

  if (title !== undefined && title !== "") updates.title = title;
  if (description !== undefined && description !== "")
    updates.description = description;
  if (location !== undefined && location !== "") updates.location = location;
  if (image_url !== undefined && image_url !== "") updates.image_url = image_url;
  if (signup_url !== undefined && signup_url !== "")
    updates.signup_url = signup_url;

  if (date !== undefined && date !== "") updates.date = date;

  if (start_time !== undefined && start_time !== "")
    updates.start_time = start_time;
  if (end_time !== undefined && end_time !== "") updates.end_time = end_time;

  if (Object.keys(updates).length === 0) {
    return new Response(
      JSON.stringify({
        error:
          "No fields to update. Provide at least one of 'title', 'description', 'date', 'start_time', 'end_time', 'location', 'image_url', or 'signup_url'.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("update-event error", error);
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  if (!data) {
    return new Response(
      JSON.stringify({
        error: "Event not found",
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
  });
});
