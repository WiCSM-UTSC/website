## applyTo: "frontend/\*_/_.{ts,tsx,jsx,css}"

# Frontend Agent – WiCSM Website

You are a frontend development agent for a **Next.js 16 (App Router)** project using **React 19**, **TypeScript 5**, **Tailwind CSS 4**, and **Framer Motion**.

## Architecture Awareness

- **App Router**: Pages live in `frontend/app/`. Server Components are the default; only add `"use client"` when the component requires hooks, event handlers, browser APIs, or Framer Motion.
- **Components directory**: Shared, reusable UI components live in `frontend/components/`. Feature-specific components are co-located inside their route folder (e.g., `app/events/EventCard.tsx`).
- **Data flow**: Pages and server components fetch data from internal API routes (`/api/*`). Client components receive data as props or use custom hooks—**never import from `app/api/` directly**.
- **Styling**: Use Tailwind CSS utility classes. Scoped CSS files (e.g., `EventCard.css`) are acceptable for complex component styles. Avoid inline `style` objects.

## Code Quality Rules

### TypeScript

- `strict: true` is enabled. Never use `any`.
- Export component prop types as `type` aliases in the same file or a sibling `types.ts` when shared across files.
- Use discriminated unions and exhaustive checks for state variants.

### Component Design

- **Single Responsibility**: One component per file. If a component exceeds ~120 lines, look for extractable sub-components.
- **Props over internal state**: Lift state to the nearest common parent. Keep leaf components pure and stateless when possible.
- **Memoization**: Apply `React.memo` to components that re-render with unchanged props. Use `useMemo` for expensive derived values and `useCallback` for stable handler references passed to children.
- **Lazy loading**: Use `next/dynamic` for heavy components (e.g., modals, maps) that aren't visible on initial paint.
- **Images**: Always use `next/image` with explicit `width`, `height`, and descriptive `alt` text.

### Accessibility

- Use semantic HTML (`<section>`, `<nav>`, `<button>`, `<time>`) over generic `<div>` / `<span>`.
- Interactive elements must be keyboard navigable and have visible focus styles.
- Provide `aria-label` or `aria-labelledby` on icon-only buttons and non-text content.
- Respect `prefers-reduced-motion` (Framer Motion's `useReducedMotion` is already in use).

### Refactoring & Decoupling

- Identify duplicated TSX/JSX patterns and extract them into shared components under `components/`.
- Extract repeated logic (pagination math, date formatting) into `utils.ts` files collocated with the feature.
- Avoid prop drilling beyond two levels—use composition patterns or context when appropriate.
- When editing a component, audit its imports: remove unused ones and verify no cross-layer violations exist.

### Commenting

Apply JSDoc block headers to every **new or modified file and exported function**:

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

Use inline `//` comments only for non-obvious logic (e.g., why a specific Tailwind class order matters, workaround for a known issue). Do not restate what the code already says.

### Performance Checklist

Before finalizing any frontend change, verify:

1. No unnecessary `"use client"` directives on components that could be server-rendered.
2. No large third-party libraries imported in the client bundle without lazy loading.
3. Event handlers and derived values are memoized where appropriate.
4. List keys are stable and unique (prefer `id` over array index).
5. Tailwind classes are applied rather than runtime CSS-in-JS styles.
6. Animations degrade gracefully for users who prefer reduced motion.
