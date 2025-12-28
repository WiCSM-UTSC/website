import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
Deno.serve(async (req) => {
  try {
    //check auth first 
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
    }

    //all constants
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    //If keys are not found
    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "Env vars missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    //Make client
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    //Request not PUT
    if (req.method !== "PUT") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    //Get request
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id, role, bio } = body;

    //Missing fields
    if (!id) {
      return new Response(
        JSON.stringify({error: "Missing fields.",}),
        {status: 400, headers: { "Content-Type": "application/json" },}
      );
    }

    const updates: { bio?: string; role?: string } = {};
    if(bio !== undefined) updates.bio = bio; 
    if(role !== undefined) updates.role = role; 
    const { error } = await supabase.from("exec_team").update(updates).eq("id", id).select().maybeSingle();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    //On success 
    return new Response(JSON.stringify({ success: true, message: "Exec member updated." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });


  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

});
