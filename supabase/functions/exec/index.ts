import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
Deno.serve(async (req)=>{
  if (req.method !== "POST") {
    return new Response(JSON.stringify({
      error: "Method not allowed"
    }), {
      status: 405,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  // Parse JSON
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
  const { name, role, image_url, bio, order_index } = body;
  // Validate required fields
  if (!name || !role) {
    return new Response(JSON.stringify({
      error: "Missing required fields: name, role"
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  // Create Supabase client
  const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
  // Insert into exec_team
  const { data, error } = await supabase.from("exec_team").insert([
    {
      name,
      role,
      image_url,
      bio,
      order_index: order_index ?? null
    }
  ]).select("id").single();
  if (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  return new Response(JSON.stringify({
    success: true,
    exec_id: data.id
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
});
