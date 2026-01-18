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

      // Only allow these fields
      const allowedPut = new Set(["id", "role", "bio", "name", "image_url", "order_index"]);
      const extraPutFields = Object.keys(body).filter((k) => !allowedPut.has(k));
      if (extraPutFields.length) {
        return new Response(
          JSON.stringify({ error: `Unexpected fields: ${extraPutFields.join(", ")}` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const { id, role, bio, name, image_url, order_index } = body;

      //Missing fields
      if (!id) {
        return new Response(
          JSON.stringify({error: "Missing fields.",}),
          {status: 400, headers: { "Content-Type": "application/json" },}
        );
      }

      // Validate order_index is an integer if provided
      if (order_index !== undefined && order_index !== null) {
        if (typeof order_index !== "number" || !Number.isInteger(order_index)) {
          return new Response(
            JSON.stringify({ error: "order_index must be an integer" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
      }


      const updates: { bio?: string; role?: string; name?: string; image_url?:string; order_index?:number } = {};
      if(bio !== undefined) updates.bio = bio; 
      if(role !== undefined) updates.role = role; 
      if(name !== undefined) updates.name = name; 
      if(image_url !== undefined) updates.image_url = image_url; 
      if(order_index !== undefined && order_index !== null) updates.order_index = order_index; 

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
    if (req.method === "POST") {
      const url = new URL(req.url);
      const parts = url.pathname.split("/").filter(Boolean);

      const execIndex = parts.indexOf("exec");
      if (execIndex !== -1 && parts[execIndex + 2] === "image") {
        const execId = parts[execIndex + 1];
        const authHeader =
          req.headers.get("authorization") ||
          req.headers.get("Authorization") ||
          "";

        const token = authHeader.startsWith("Bearer ")
          ? authHeader.slice("Bearer ".length).trim()
          : "";

        if (!token) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Validate token with Supabase Auth
        const { data: userData, error: userError } = await supabase.auth.getUser(token);
        if (userError || !userData?.user) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Parse multipart/form-data (this will throw if not multipart)
        let form;
        try {
          form = await req.formData();
        } catch {
          return new Response(
            JSON.stringify({ error: "Request must be multipart/form-data" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const image = form.get("image");
        if (!(image instanceof File)) {
          return new Response(
            JSON.stringify({ error: "Missing file field 'image'" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const imgType = (image.type || "").toLowerCase();
        if (!imgType.startsWith("image/")) {
          return new Response(
            JSON.stringify({ error: "Uploaded file must be an image" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const filename = image.name || "avatar.jpg";
        const extFromName = filename.includes(".")
          ? filename.split(".").pop()?.toLowerCase() ?? ""
          : "";

        const extFromMime =
          imgType === "image/jpeg" ? "jpg" :
          imgType === "image/png" ? "png" :
          imgType === "image/webp" ? "webp" :
          imgType === "image/gif" ? "gif" :
          "jpg";

        const ext = extFromName ? extFromName : extFromMime;

        const bucket = "exec-images";
        const objectPath = `${execId}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(objectPath, image, { contentType: imgType || undefined, upsert: true });

        if (uploadError) {
          return new Response(JSON.stringify({ error: uploadError.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(objectPath);
        const imageUrl = publicData?.publicUrl;

        const { error: updateError } = await supabase
          .from("exec_team")
          .update({ image_url: imageUrl })
          .eq("id", execId);

        if (updateError) {
          return new Response(JSON.stringify({ error: updateError.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(
          JSON.stringify({ success: true, exec_id: execId, image_url: imageUrl }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
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
