import {
  getSupabaseCredentials,
  hasMissingAnonCredentials,
  requestSupabaseEdgeFunction,
} from "../utils/supabase";

export async function GET() {
  const credentials = getSupabaseCredentials();

  if (hasMissingAnonCredentials(credentials)) {
    return Response.json(
      {
        error:
          "Server misconfiguration: SUPABASE_URL and/or SUPABASE_ANON_KEY are not set.",
      },
      { status: 500 },
    );
  }

  try {
    const { response, body } = await requestSupabaseEdgeFunction(
      credentials.url,
      "exec",
      credentials.anonKey,
    );

    if (!response.ok) {
      return Response.json(
        {
          error:
            body?.error ||
            body?.message ||
            `Upstream error from Supabase: ${response.status} ${response.statusText}`,
        },
        { status: response.status },
      );
    }

    return Response.json(body);
  } catch (error) {
    console.error("Failed to fetch executive data:", error);

    return Response.json(
      { error: "Unable to retrieve executive data." },
      { status: 500 },
    );
  }
}