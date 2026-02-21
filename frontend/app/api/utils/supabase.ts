export type SupabaseCredentials = {
  url: string;
  serviceKey: string;
  anonKey: string;
};

export type EdgeRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
};

export function getSupabaseCredentials(): SupabaseCredentials {
  return {
    url: process.env.SUPABASE_URL || "",
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    anonKey: process.env.SUPABASE_ANON_KEY || "",
  };
}

export function hasMissingAnonCredentials(
  credentials: SupabaseCredentials,
): boolean {
  return !credentials.url || !credentials.anonKey;
}

export function hasMissingServiceCredentials(
  credentials: SupabaseCredentials,
): boolean {
  return !credentials.url || !credentials.serviceKey;
}

function getSupabaseAnonHeaders(anonKey: string) {
  return {
    Authorization: `Bearer ${anonKey}`,
    "Content-Type": "application/json",
  };
}

function getSupabaseServiceHeaders(serviceKey: string) {
  return {
    Authorization: `Bearer ${serviceKey}`,
    apikey: serviceKey,
    "Content-Type": "application/json",
  };
}

/**
 * Core network helper for Supabase Edge Functions.
 * Use this for calls to /functions/v1/* endpoints with anon-key authorization.
 * Returns the raw response plus a safely parsed JSON payload (falls back to {}).
 */
export async function requestSupabaseEdgeFunction(
  baseUrl: string,
  path: string,
  anonKey: string,
  options: EdgeRequestOptions = {},
) {
  const { method = "GET", body } = options;

  const response = await fetch(`${baseUrl}/functions/v1/${path}`, {
    method,
    headers: getSupabaseAnonHeaders(anonKey),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));
  return { response, body: payload };
}

/**
 * Core network helper for Supabase REST API.
 * Use this for calls to /rest/v1/* endpoints with service-role authorization.
 * Returns the raw response plus a safely parsed JSON payload (falls back to []).
 */
export async function requestSupabaseRest(
  credentials: SupabaseCredentials,
  path: string,
  options: EdgeRequestOptions = {},
) {
  const { method = "GET", body } = options;

  const response = await fetch(`${credentials.url}/rest/v1/${path}`, {
    method,
    headers: getSupabaseServiceHeaders(credentials.serviceKey),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => []);
  return { response, body: payload };
}
