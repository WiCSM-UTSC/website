
export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        return Response.json(
            {
                error:
                    "Server misconfiguration: NEXT_PUBLIC_SUPABASE_URL and/or " +
                    "NEXT_PUBLIC_SUPABASE_ANON_KEY are not set.",
            },
            { status: 500 }
        );
    }

    const res = await fetch(`${supabaseUrl}/functions/v1/exec`, {
        headers: {
            Authorization: `Bearer ${supabaseAnonKey}`,
        },
    });

    if (!res.ok) {
        return Response.json(
            { error: `Upstream error from Supabase: ${res.status} ${res.statusText}` },
            { status: res.status }
        );
    }

    const data = await res.json();
    return Response.json(data);
}