import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    //get all constants
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    //If keys are not found
    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "Env vars missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl,serviceRoleKey);

    //put method
    if (req.method === "PUT") {
      //check auth first 
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
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

      const { id, role, bio, name } = body;

      //Missing fields
      if (!id) {
        return new Response(
          JSON.stringify({error: "Missing fields.",}),
          {status: 400, headers: { "Content-Type": "application/json" },}
        );
      }

      const updates: { bio?: string; role?: string; name?: string } = {};
      if(bio !== undefined) updates.bio = bio; 
      if(role !== undefined) updates.role = role; 
      if(name !== undefined) updates.name = name; 
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

    }

    //get method 
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("exec_team")
        .select("*")
        .order("order_index", { ascending: true })
        .order("name", { ascending: true });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          execs: data
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    //post method
    if (req.method === "POST") {
      let body;
      try {
        body = await req.json();
      } catch {
        return new Response(
          JSON.stringify({ error: "Invalid JSON body" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      const { name, role, image_url, bio, order_index } = body;

      if (!name || !role) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: name, role" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      const { data, error } = await supabase
        .from("exec_team")
        .insert([
          {
            name,
            role,
            image_url,
            bio,
            order_index: order_index ?? null
          }
        ])
        .select("id")
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          exec_id: data.id
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    //method not allowed 
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" }
      }
    );
    
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
