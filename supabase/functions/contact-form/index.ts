import { createClient } from "jsr:@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
Deno.serve(async (req) => {
  try { 
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //If keys are not found
    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({
        error: "Env vars missing"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json"}
      });
    }

    //Request not POST
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405,
          headers: { "Content-Type": "application/json"} 
      });
    }

    //Get request 
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { name, email, message } = body;

    //Missing fields [TODO: make more specfic messages]
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        error: "Missing fields."
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    //Invalid email 
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    //Make client 
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    //Add an entry to the messages table 
    const { error } = await supabase.from("messages").insert({name, email, message,});

    if (error) { 
      return new Response(JSON.stringify({
        error: error.message
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    //Success
    return new Response(
      JSON.stringify({
        success: true,
        status: "email_sent",
        }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
    } catch (err) {
      return new Response(JSON.stringify({
        error: err.message
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });

    }

});

