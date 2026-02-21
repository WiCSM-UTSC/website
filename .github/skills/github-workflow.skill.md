---
name: github-workflow
description: Standards for commits, branches, PRs, issues, and code review in this project. Use this when performing any Git operations, creating pull requests, managing issues, or reviewing code.
---

Follow these GitHub workflow conventions for the WiCSM Website project:

## Commits

1. Use **Conventional Commits** format for all commit messages: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`.
2. Keep commits atomic—one logical change per commit. Do not bundle unrelated changes.
3. Write commit messages in imperative mood (e.g., "add event pagination", not "added event pagination").

## Branches

1. Name branches in kebab-case prefixed by type: `feat/event-card-redesign`, `fix/supabase-credential-guard`, `refactor/extract-date-utils`.
2. Branch from `main` for new work.
3. Delete feature branches after merging.
4. Never force-push to shared branches.

## Pull Requests

1. Use the repo's PR template located at `.github/PULL_REQUEST_TEMPLATE.md`.
2. PR title must follow conventional format matching the primary commit type (e.g., `feat: add event pagination`).
3. Keep PRs scoped to a **single concern**; split unrelated changes into separate PRs.
4. Include screenshots or recordings for any UI-affecting changes.
5. Document API contract changes (new/modified endpoints, request/response shapes) when applicable.
6. Reference related issues using keywords (`Closes #42`, `Fixes #17`).
7. Request review from at least one team member before merging.
8. Use squash merges for feature branches to keep history clean.

## Issues

1. Reference related issues in commit messages and PR descriptions.
2. When creating bug issues, include: clear title, reproduction steps, expected vs. actual behavior, and the relevant endpoint or component.
3. When creating feature issues, include: description, acceptance criteria, and affected areas.
4. Label issues appropriately: `bug`, `enhancement`, `frontend`, `api`, `backend`, `documentation`.

## Code Review

1. Focus on: correctness, security, accessibility, performance, and adherence to the project's coding standards.
2. Verify no secrets or internal error details are exposed in response payloads.
3. Suggest specific code changes with rationale—avoid vague feedback.
4. Approve only when the PR checklist is fully satisfied.
