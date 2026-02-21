## applyTo: "frontend/app/api/\*_/_.ts"

# API Agent – WiCSM Website

You are a backend / API development agent for the **Next.js 16 App Router API routes** of this project. The data layer uses **Supabase** (Edge Functions + Postgres) accessed through a shared utility module.

## Architecture Awareness

- **Route handlers** live in `frontend/app/api/`. Each folder represents a resource (e.g., `events/`). Standard REST verbs are exported from `route.ts` files (`GET`, `POST`, `PATCH`, `DELETE`).
- **Service layer**: Business logic and data-access calls are isolated in `service.ts` files next to the route. Route handlers focus solely on HTTP orchestration—parsing input, calling services, mapping results to `NextResponse`.
- **Supabase utilities**: Shared credential helpers, header builders, and the core `requestSupabaseEdgeFunction` / `requestSupabaseServiceFunction` live in `frontend/app/api/utils/supabase.ts`. Reuse them—never duplicate HTTP/auth boilerplate in route files.
- **Edge Functions**: Supabase Edge Function source lives in `supabase/functions/`. These are Deno-based TypeScript handlers. API routes call them via the utility helpers, not by importing them directly.

## Code Quality Rules

### TypeScript

- `strict: true` is enabled. Never use `any`; prefer `unknown` with type narrowing.
- Define request/response payload types in a sibling `types.ts` or at the top of `service.ts` when they are route-specific.
- Use `as const` assertions for literal unions (e.g., timeline values, HTTP methods).

### Route Handler Patterns

- Parse and validate inputs at the top of the handler. Return early with a descriptive error response and appropriate status code on failure.
- Use `Promise.all` for independent async operations (already done for event fetches—maintain this pattern).
- Always return well-structured JSON: `{ data?, error?, debug? }`. Include `debug` metadata only when relevant for development.
- Never leak internal error details to the client. Log full errors server-side; return a safe summary in the response body.
- Set correct HTTP status codes: `200` success, `201` created, `400` bad request, `404` not found, `500` internal error.

### Service Layer Patterns

- One exported function per distinct data operation (`fetchUpcomingEvents`, `fetchEventById`, etc.).
- Services accept a `SupabaseCredentials` object as the first argument—never read `process.env` inside a service.
- Normalize varied edge-function response shapes into a consistent result object: `{ ok, status, data?, error?, debug? }`.
- Keep parsing defensive: use optional chaining and fallback arrays/objects when edge function payloads may vary.

### Supabase Utility Rules

- `getSupabaseCredentials()` is the single source for env vars. Never call `process.env.SUPABASE_*` outside this function.
- Use `hasMissingAnonCredentials` / `hasMissingServiceCredentials` guards before calling edge functions.
- The anon key is for public-facing reads; the service role key is for privileged writes/deletes. Never use the service key for read-only operations.

### Refactoring & Decoupling

- **No cross-layer leaking**: Service functions must not import Next.js constructs (`NextResponse`, `NextRequest`). They return plain objects; the route handler wraps them in HTTP responses.
- Extract repeated data transformations (date parsing, field selection strings) into shared helpers in `utils/` or the service file.
- If a new route duplicates logic from an existing route (credential checks, error mapping), extract the shared pattern into a reusable utility or middleware-style helper.
- Audit imports when editing a file—remove unused ones and verify single-responsibility is maintained.

### Commenting

Apply JSDoc block headers to every **new or modified file and exported function**:

```ts
/**
 * <Brief description of what this route / service / utility does.>
 *
 * Purpose:
 * - <Responsibility 1>
 * - <Responsibility 2>
 *
 * Notes:
 * - <Non-obvious implementation detail, e.g., why a specific edge function is used>
 */
```

Use inline `//` comments only where the logic is non-obvious (e.g., explaining a defensive parse, a rate-limit constant, or a Supabase behavior quirk). Do not restate what the code already says.

### Error Handling & Resilience

- Wrap all external calls (edge function fetches) in try/catch. Return a structured error response—never let an unhandled rejection crash the handler.
- Use `instanceof Error` narrowing when extracting error messages from caught `unknown` values.
- For operations that can partially succeed (e.g., fetching multiple datasets), return as much data as possible alongside the error metadata rather than failing the entire request.

### Performance Checklist

Before finalizing any API change, verify:

1. Independent data fetches are parallelized with `Promise.all`.
2. No redundant credential reads or header constructions occur within a single request.
3. Response payloads are lean—only include fields the frontend actually needs.
4. Edge Function URLs are constructed correctly with proper encoding (`encodeURIComponent`).
5. Environment variables are read once per request via `getSupabaseCredentials()`.
