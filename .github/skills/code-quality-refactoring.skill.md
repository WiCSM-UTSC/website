---
name: code-quality-refactoring
description: Guide for refactoring, decoupling, and improving code quality across the codebase. Use this when asked to refactor code, reduce coupling, improve performance, or clean up existing files.
---

Follow these practices when refactoring or improving code quality in the WiCSM Website project:

## Refactoring Principles

1. **Single Responsibility**: Each file should own one concern (a component, a service, a utility set). If a file handles multiple concerns, split it.
2. **No cross-layer imports**: UI components must never import from `app/api/` directly. Data flows through hooks or page-level fetches.
3. Prefer small, composable functions over large monolithic ones. If a function exceeds ~30 lines, look for extractable helpers.
4. Extract shared helpers to `utils.ts` files collocated with their module.
5. When modifying a file, scan for duplicated logic—extract it into a shared utility before finishing.

## Decoupling Checklist

1. Audit imports in every file you touch. Remove unused imports and verify no cross-layer violations exist.
2. Service functions must not import framework constructs (`NextResponse`, `NextRequest`). They return plain objects.
3. Components should not contain data-fetching logic. Move it to the page level or a custom hook.
4. Avoid prop drilling beyond two levels—use composition patterns or React context.
5. Configuration values (URLs, keys, constants) should come from a single source, not be scattered across files.

## Performance Optimization

1. Only add `"use client"` to components that truly need client-side interactivity.
2. Lazy-load heavy components with `next/dynamic` or `React.lazy`.
3. Apply `React.memo`, `useMemo`, and `useCallback` where components re-render with unchanged props.
4. Parallelize independent async operations with `Promise.all`.
5. Avoid blocking the main thread—offload expensive work to Web Workers or server actions where feasible.
6. Use `next/image` with explicit `width` and `height` for all images.
7. Response payloads should be lean—only include fields the consumer actually needs.

## Commenting Standards

1. When modifying or creating a file, ensure it has a JSDoc block header:

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

2. Add inline `//` comments only where logic is non-obvious. Avoid restating what the code already says.
3. Remove stale or misleading comments during refactoring.

## TypeScript Strictness

1. `strict: true` is enabled. Never use `any`; prefer `unknown` with narrowing.
2. Prefer `type` over `interface` for object shapes unless declaration merging is needed.
3. Export reusable types from dedicated `types.ts` files next to the feature they belong to.
4. Use discriminated unions and exhaustive checks for state variants.
5. Use `as const` assertions for literal unions.

## Validation Steps

After refactoring, confirm:

1. `npm run build` passes with zero errors.
2. `npm run lint` passes with zero new warnings.
3. No runtime regressions—test the affected pages or endpoints manually.
4. Imports are clean: no unused imports, no circular dependencies, no cross-layer violations.
