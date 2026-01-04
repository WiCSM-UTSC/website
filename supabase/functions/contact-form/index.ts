import { createClient } from "jsr:@supabase/supabase-js@2";
import { Redis } from "https://esm.sh/@upstash/redis";
import { Ratelimit } from "https://esm.sh/@upstash/ratelimit";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
Deno.serve(async (req) => {
  try {
    //all constants
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const mailerSendKey = Deno.env.get("MAILERSEND_API_KEY");

    const fromEmail = Deno.env.get("MAILERSEND_FROM_EMAIL");
    const receiverEmail = Deno.env.get("CONTACT_RECEIVER_EMAIL");
    const emailTemplate = Deno.env.get("MAILERSEND_CONTACT_TEMPLATE_ID");

    const redisUrl = Deno.env.get("UPSTASH_REDIS_REST_URL");
    const redisToken = Deno.env.get("UPSTASH_REDIS_REST_TOKEN");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //If keys are not found
    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !mailerSendKey ||
      !fromEmail ||
      !receiverEmail ||
      !emailTemplate ||
      !redisUrl ||
      !redisToken
    ) {
      return new Response(JSON.stringify({ error: "Env vars missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    //get the limiter

    const redis = new Redis({ url: redisUrl, token: redisToken });

    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(2, "10 s"), //2 req per 10s
      analytics: true,
    });

    // use identifier based on IP address
    const identifier = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          retry_after: 60,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }


    //Request not POST
    if (req.method !== "POST") {
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

    const { name, email, message } = body;

    //Missing fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Missing fields.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    //Invalid email
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    //Make client
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    //Add an entry to the messages table
    const { error } = await supabase
      .from("messages")
      .insert({ name, email, message });

    if (error) {
      return new Response(
        JSON.stringify({
          error: error.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const mailRes = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mailerSendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email: fromEmail,
          name: "WiCSM Contact Form",
        },
        to: [
          {
            email: receiverEmail,
            name: "WiCSM Team",
          },
        ],
        reply_to: {
          email: email,
          name: name,
        },
        subject: "New Contact Form Message",
        template_id: emailTemplate,
        variables: [
          {
            email: receiverEmail,
            substitutions: {
              name: { var: "name", value: name },
              email: { var: "email", value: email },
              message: { var: "message", value: message },
            },
          },
        ],
      }),
    });

    if (!mailRes.ok) {
      const err = await mailRes.text();
      return new Response(
        JSON.stringify({ error: "Email failed", details: err }),
        { status: 500 }
      );
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
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
