import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function getExecIdFromUrl(url: string): string | null {
  const { pathname } = new URL(url);
  const parts = pathname.split("/").filter(Boolean);

  for (let i = 0; i <= parts.length - 3; i++) {
    if (parts[i] === "execs" && parts[i + 2] === "image") {
      return parts[i + 1] || null;
    }
  }
  return null;
}

function requireAdmin(req: Request): { ok: true } | { ok: false; res: Response } {
  const adminToken = Deno.env.get("ADMIN_TOKEN");
  if (!adminToken) {
    return {
      ok: false as const,
      res: new Response(JSON.stringify({ error: "ADMIN_TOKEN missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  const auth =
    req.headers.get("Authorization") || req.headers.get("authorization");
  if (!auth) {
    return {
      ok: false as const,
      res: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  if (auth !== `Bearer ${adminToken}`) {
    return {
      ok: false as const,
      res: new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  return { ok: true as const };
}

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

   if (req.method === "POST") {
     const execId = getExecIdFromUrl(req.url);

     if (execId) {
       const authCheck = requireAdmin(req);
       if (!authCheck.ok) return authCheck.res;

       const contentType = req.headers.get("content-type") || "";
       if (!contentType.includes("multipart/form-data")) {
         return new Response(
           JSON.stringify({ error: "Content-Type must be multipart/form-data" }),
           { status: 400, headers: { "Content-Type": "application/json" } },
         );
       }

       // Optional: ensure exec exists
       const { data: existing, error: existsErr } = await supabase
         .from("exec_team")
         .select("id")
         .eq("id", execId)
         .maybeSingle();

       if (existsErr) {
         return new Response(JSON.stringify({ error: existsErr.message }), {
           status: 500,
           headers: { "Content-Type": "application/json" },
         });
       }
       if (!existing) {
         return new Response(JSON.stringify({ error: "Exec not found" }), {
           status: 404,
           headers: { "Content-Type": "application/json" },
         });
       }

       const formData = await req.formData();
       const image = formData.get("image");

       if (!image || !(image instanceof File)) {
         return new Response(
           JSON.stringify({ error: 'Missing file field "image"' }),
           { status: 400, headers: { "Content-Type": "application/json" } },
         );
       }

       if (!image.type.startsWith("image/")) {
         return new Response(JSON.stringify({ error: "File must be an image" }), {
           status: 400,
           headers: { "Content-Type": "application/json" },
         });
       }

       // File naming: first 8 chars of exec UUID (matches sample style)
       const shortId = execId.slice(0, 8);
       const extFromName = image.name.includes(".")
         ? image.name.split(".").pop()
         : null;
       const extFromMime = image.type.split("/")[1] || "jpg";
       const ext = (extFromName || extFromMime).toLowerCase();

       const filePath = `${shortId}.${ext}`;

       const { error: uploadError } = await supabase.storage
         .from("exec-images")
         .upload(filePath, image, {
           contentType: image.type,
           upsert: true,
         });

       if (uploadError) {
         return new Response(JSON.stringify({ error: uploadError.message }), {
           status: 500,
           headers: { "Content-Type": "application/json" },
         });
       }

       const { data: pub } = supabase.storage
         .from("exec-images")
         .getPublicUrl(filePath);

       const imageUrl = pub.publicUrl;

       const { error: updateErr } = await supabase
         .from("exec_team")
         .update({ image_url: imageUrl })
         .eq("id", execId);

       if (updateErr) {
         return new Response(JSON.stringify({ error: updateErr.message }), {
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
