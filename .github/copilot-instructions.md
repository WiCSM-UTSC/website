# Copilot Instructions – WiCSM Website

## Project Overview

This is an organizational website built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, and **Tailwind CSS 4**. The backend uses **Supabase** (Edge Functions + Postgres) and the frontend communicates through Next.js API route handlers.

## General Coding Standards

### TypeScript

- Enable and respect `strict: true`. Never use `any`; prefer `unknown` with narrowing.
- Export reusable types from dedicated `types.ts` files next to the feature they belong to.
- Prefer `type` over `interface` for object shapes unless declaration merging is needed.

### Formatting & Style

- Use **2-space indentation**, trailing commas, and double quotes for JSX/TSX attributes.
- Follow the existing ESLint config (`eslint.config.mjs`). Do not add rules that conflict.

### Commenting Conventions

Use **JSDoc-style block headers** for files and exported functions:

```ts
/**
 * <Short summary of what this file / function does.>
 *
 * Purpose:
 * - <Bullet describing responsibility 1>
 * - <Bullet describing responsibility 2>
 *
 * Notes:
 * - <Any non-obvious implementation detail>
 */
```

Add inline comments (`//`) only where logic is non-obvious. Avoid restating what the code already says.

### Refactoring & Decoupling

- **Single Responsibility**: Each file should own one concern (e.g., a component, a service, a utility set).
- **No cross-layer imports**: UI components must never import from `app/api/` directly. Data flows through hooks or page-level fetches.
- Prefer small, composable functions over large monolithic ones.
- Extract shared helpers to `utils.ts` files collocated with their module.
- When modifying a file, identify and eliminate duplicated logic—extract it into a shared utility.

### Performance

- Prefer `"use client"` only on components that truly need client-side interactivity.
- Lazy-load heavy components with `next/dynamic` or `React.lazy`.
- Use `React.memo` or `useMemo`/`useCallback` when a component re-renders with unchanged props.
- Avoid blocking the main thread—offload expensive work to Web Workers or server actions where feasible.
- Images should always use `next/image` with explicit `width` and `height`.

### Git & PR

- Commit messages follow Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.
- PRs should be scoped to a single concern when possible.
