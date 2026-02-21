---
name: frontend-development
description: Guide for building and modifying the Next.js 16 / React 19 / Tailwind CSS 4 frontend. Use this when working on components, pages, styles, or client-side logic in the frontend/ directory.
---

This project's frontend uses **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, **Tailwind CSS 4**, and **Framer Motion**. Follow these practices when developing frontend code:

## Architecture

1. Pages live in `frontend/app/`. Server Components are the default; only add `"use client"` when the component requires hooks, event handlers, browser APIs, or Framer Motion.
2. Shared, reusable UI components live in `frontend/components/`. Feature-specific components are co-located inside their route folder (e.g., `app/events/EventCard.tsx`).
3. Pages and server components should fetch data using the project's documented backend HTTP APIs or shared data-access utilities (for example, via `fetch` in Server Components). Client components receive data as props or via custom hooks; avoid importing server-only code directly into client components.
4. Use Tailwind CSS utility classes for styling. Scoped CSS files (e.g., `EventCard.css`) are acceptable for complex component styles. Avoid inline `style` objects.

## TypeScript

1. `strict: true` is enabled. Never use `any`.
2. Export component prop types as `type` aliases in the same file or a sibling `types.ts` when shared across files.
3. Use discriminated unions and exhaustive checks for state variants.

## Component Design

1. **Single Responsibility**: One component per file. If a component exceeds ~120 lines, extract sub-components.
2. **Props over internal state**: Lift state to the nearest common parent. Keep leaf components pure and stateless when possible.
3. **Memoization**: Apply `React.memo` to components that re-render with unchanged props. Use `useMemo` for expensive derived values and `useCallback` for stable handler references passed to children.
4. **Lazy loading**: Use `next/dynamic` for heavy components (e.g., modals, maps) that aren't visible on initial paint.
5. **Images**: Always use `next/image` with explicit `width`, `height`, and descriptive `alt` text.

## Accessibility

1. Use semantic HTML (`<section>`, `<nav>`, `<button>`, `<time>`) over generic `<div>` / `<span>`.
2. Interactive elements must be keyboard navigable and have visible focus styles.
3. Provide `aria-label` or `aria-labelledby` on icon-only buttons and non-text content.
4. Respect `prefers-reduced-motion` (Framer Motion's `useReducedMotion` is already in use).

## Refactoring & Decoupling

1. Identify duplicated TSX patterns and extract them into shared components under `components/`.
2. Extract repeated logic (pagination math, date formatting) into `utils.ts` files collocated with the feature.
3. Avoid prop drilling beyond two levels—use composition patterns or context when appropriate.
4. When editing a component, audit its imports: remove unused ones and verify no cross-layer violations exist.

## Commenting

1. Apply JSDoc block headers to every new or modified file and exported function:

```ts
/**
 * <Brief description of what this component / function does.>
 *
 * Purpose:
 * - <Responsibility 1>
 * - <Responsibility 2>
 *
 * Notes:
 * - <Non-obvious implementation detail, if any>
 */
```

2. Use inline `//` comments only for non-obvious logic. Do not restate what the code already says.

## Performance Checklist

Before finalizing any frontend change, verify:

1. No unnecessary `"use client"` directives on components that could be server-rendered.
2. No large third-party libraries imported in the client bundle without lazy loading.
3. Event handlers and derived values are memoized where appropriate.
4. List keys are stable and unique (prefer `id` over array index).
5. Tailwind classes are applied rather than runtime CSS-in-JS styles.
6. Animations degrade gracefully for users who prefer reduced motion.
