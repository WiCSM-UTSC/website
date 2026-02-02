import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    //get all constants
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "Env vars missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    //put method
    if (req.method === "PUT") {
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

      const allowedPut = new Set([ "id", "role", "bio", "name", "image_url", "order_index", ]);
      const extraPutFields = Object.keys(body).filter( (k) => !allowedPut.has(k),);

      if (extraPutFields.length) {
        return new Response(
          JSON.stringify({
            error: `Unexpected fields: ${extraPutFields.join(", ")}`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const { id, role, bio, name, image_url, order_index } = body;

      if (!id) {
        return new Response(JSON.stringify({ error: "Missing fields." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const { data: existingExec, error: findError } = await supabase
        .from("exec_team")
        .select("id")
        .eq("id", id)
        .maybeSingle();

      if (findError) {
        return new Response(JSON.stringify({ error: findError.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!existingExec) {
        return new Response(
          JSON.stringify({ error: "Exec member with this id does not exist." }),
          { status: 404, headers: { "Content-Type": "application/json" } },
        );
      }

      if (order_index !== undefined && order_index !== null) {
        if (typeof order_index !== "number" || !Number.isInteger(order_index)) {
          return new Response(
            JSON.stringify({ error: "order_index must be an integer" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }
      }

      const updates: { bio?: string; role?: string; name?: string; image_url?: string; order_index?: number; } = {};

      if (bio !== undefined) updates.bio = bio;
      if (role !== undefined) updates.role = role;
      if (name !== undefined) updates.name = name;
      if (image_url !== undefined) updates.image_url = image_url;
      if (order_index !== undefined && order_index !== null) updates.order_index = order_index;

      const { error } = await supabase
        .from("exec_team")
        .update(updates)
        .eq("id", id)
        .select()
        .maybeSingle();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({ success: true, message: "Exec member updated." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("exec_team")
        .select("*")
        .order("order_index", { ascending: true })
        .order("name", { ascending: true });

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          execs: data,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    if (req.method === "POST") {
      const url = new URL(req.url);
      const parts = url.pathname.split("/").filter(Boolean);

      const execIndex = parts.indexOf("exec");
      if (execIndex !== -1 && parts[execIndex + 2] === "image") {
        const execId = parts[execIndex + 1];

        const { data: existingExec, error: findError } = await supabase
          .from("exec_team")
          .select("id")
          .eq("id", execId)
          .maybeSingle();

        if (findError) {
          return new Response(JSON.stringify({ error: findError.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!existingExec) {
          return new Response(
            JSON.stringify({ error: "Exec member with this id does not exist." }),
            { status: 404, headers: { "Content-Type": "application/json" } },
          );
        }

        const MAX_FORM_BYTES = 150 * 1024 * 1024; 
        const contentLengthHeader =
          req.headers.get("content-length") || req.headers.get("Content-Length");
        if (contentLengthHeader) {
          const contentLength = Number(contentLengthHeader);
          if (!Number.isFinite(contentLength) || contentLength <= 0) {
            return new Response(JSON.stringify({ error: "Invalid Content-Length" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
          if (contentLength > MAX_FORM_BYTES) {
            return new Response(
              JSON.stringify({
                error: `Form too large. Max allowed is ${MAX_FORM_BYTES} bytes.`,
              }),
              { status: 413, headers: { "Content-Type": "application/json" } },
            );
          }
        }

        let form;
        try {
          form = await req.formData();
        } catch {
          return new Response(
            JSON.stringify({ error: "Request must be multipart/form-data" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const image = form.get("image");
        if (!(image instanceof File)) {
          return new Response(
            JSON.stringify({ error: "Missing file field 'image'" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        if (typeof image.size === "number" && image.size > MAX_FORM_BYTES) {
          return new Response(
            JSON.stringify({
              error: `File too large. Max allowed is ${MAX_FORM_BYTES} bytes.`,
            }),
            { status: 413, headers: { "Content-Type": "application/json" } },
          );
        }

        const imgType = (image.type || "").toLowerCase();
        if (!imgType.startsWith("image/")) {
          return new Response(
            JSON.stringify({ error: "Uploaded file must be an image" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const filename = image.name || "avatar.jpg";
        const extFromName = filename.includes(".")
          ? (filename.split(".").pop()?.toLowerCase() ?? "")
          : "";

        const extFromMime =
          imgType === "image/jpeg"
            ? "jpg"
            : imgType === "image/png"
              ? "png"
              : imgType === "image/webp"
                ? "webp"
                : imgType === "image/gif"
                  ? "gif"
                  : "jpg";

        const ext = extFromName ? extFromName : extFromMime;

        const bucket = "exec-images";
        const objectPath = `${execId}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(objectPath, image, {
            contentType: imgType || undefined,
            upsert: true,
          });

        if (uploadError) {
          return new Response(JSON.stringify({ error: uploadError.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { data: publicData } = supabase.storage
          .from(bucket)
          .getPublicUrl(objectPath);
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
          JSON.stringify({
            success: true,
            exec_id: execId,
            image_url: imageUrl,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    if (req.method === "POST") {
      let body;
      try {
        body = await req.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const { name, role, image_url, bio, order_index } = body;

      if (!name || !role) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: name, role" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
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
            order_index: order_index ?? null,
          },
        ])
        .select("id")
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          exec_id: data.id,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
