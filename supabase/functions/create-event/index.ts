// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";
console.info('server started');
Deno.serve(async (req)=>{
  // check HTTP method
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405
    });
  }
  // parse request body
  let body;
  try {
    body = await req.json();
  } catch  {
    return new Response(JSON.stringify({
      error: "Invalid JSON body"
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  // validate required fields -> image_url, signup_url, start and end time should be optional (?)
  const { title, description, date, location, image_url, signup_url, start_time, end_time } = body;
  if (!title || !description || !date || !location) {
    return new Response(JSON.stringify({
      error: "Missing fields."
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  // connect to supabase 
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({
      error: "Env vars missing"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data, error } = await supabase.from("events").insert({
    title,
    description,
    date,
    location,
    image_url,
    signup_url,
    start_time,
    end_time
  });
  if (error) {
    console.log("Add-event error!", error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  // success
  return new Response(JSON.stringify({
    success: true,
    status: "event_added"
  }), {
    status: 201,
    headers: {
      "Content-Type": "application/json"
    }
  });
});
