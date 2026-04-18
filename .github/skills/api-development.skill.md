---
name: api-development
description: Guide for building and modifying Next.js API route handlers and the Supabase service layer. Use this when working on files in frontend/app/api/ or supabase/functions/.
---

This project's API layer uses **Next.js 16 App Router route handlers** backed by **Supabase** (Edge Functions + Postgres). Follow these practices when developing API code:

## Architecture

1. Route handlers live in `frontend/app/api/`. Each folder represents a resource (e.g., `events/`). Standard REST verbs are exported from `route.ts` files (`GET`, `POST`, `PATCH`, `DELETE`).
2. Business logic and data-access calls are isolated in `service.ts` files next to the route. Route handlers focus solely on HTTP orchestration—parsing input, calling services, mapping results to `NextResponse`.
3. Shared credential helpers, header builders, and the core `requestSupabaseEdgeFunction` / `requestSupabaseServiceFunction` live in `frontend/app/api/utils/supabase.ts`. Reuse them—never duplicate HTTP/auth boilerplate.
4. Supabase Edge Function source lives in `supabase/functions/`. These are Deno-based TypeScript handlers. API routes call them via the utility helpers, not by importing them directly.

## TypeScript

1. `strict: true` is enabled. Never use `any`; prefer `unknown` with type narrowing.
2. Define request/response payload types in a sibling `types.ts` or at the top of `service.ts` when they are route-specific.
3. Use `as const` assertions for literal unions (e.g., timeline values, HTTP methods).

## Route Handler Patterns

1. Parse and validate inputs at the top of the handler. Return early with a descriptive error response and appropriate status code on failure.
2. Use `Promise.all` for independent async operations.
3. Always return well-structured JSON: `{ data?, error?, debug? }`. Include `debug` metadata only in development.
4. Never leak internal error details to the client. Log full errors server-side; return a safe summary in the response body.
5. Set correct HTTP status codes: `200` success, `201` created, `400` bad request, `404` not found, `500` internal error.

## Service Layer Patterns

1. One exported function per distinct data operation (`fetchUpcomingEvents`, `fetchEventById`, etc.).
2. Services accept a `SupabaseCredentials` object as the first argument—never read `process.env` inside a service.
3. Normalize varied edge-function response shapes into a consistent result object: `{ ok, status, data?, error?, debug? }`.
4. Keep parsing defensive: use optional chaining and fallback arrays/objects when edge function payloads may vary.

## Supabase Utility Rules

1. `getSupabaseCredentials()` is the single source for env vars. Never call `process.env.SUPABASE_*` outside this function.
2. Use `hasMissingAnonCredentials` / `hasMissingServiceCredentials` guards before calling edge functions.
3. The anon key is for public-facing reads; the service role key is for privileged writes/deletes. Never use the service key for read-only operations.

## Refactoring & Decoupling

1. **No cross-layer leaking**: Service functions must not import Next.js constructs (`NextResponse`, `NextRequest`). They return plain objects; the route handler wraps them in HTTP responses.
2. Extract repeated data transformations (date parsing, field selection strings) into shared helpers in `utils/` or the service file.
3. If a new route duplicates logic from an existing route (credential checks, error mapping), extract the shared pattern into a reusable utility or middleware-style helper.
4. Audit imports when editing a file—remove unused ones and verify single-responsibility is maintained.

## Error Handling & Resilience

1. Wrap all external calls (edge function fetches) in try/catch. Return a structured error response—never let an unhandled rejection crash the handler.
2. Use `instanceof Error` narrowing when extracting error messages from caught `unknown` values.
3. For operations that can partially succeed (e.g., fetching multiple datasets), return as much data as possible alongside the error metadata rather than failing the entire request.

## Commenting

1. Apply JSDoc block headers to every new or modified file and exported function:

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

2. Use inline `//` comments only where the logic is non-obvious. Do not restate what the code already says.

## Performance Checklist

Before finalizing any API change, verify:

1. Independent data fetches are parallelized with `Promise.all`.
2. No redundant credential reads or header constructions occur within a single request.
3. Response payloads are lean—only include fields the frontend actually needs.
4. Edge Function URLs are constructed correctly with proper encoding (`encodeURIComponent`).
5. Environment variables are read once per request via `getSupabaseCredentials()`.
