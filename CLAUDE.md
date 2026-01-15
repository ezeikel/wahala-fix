# Claude Code Context

## Project Structure

- **Monorepo** using Turborepo + pnpm workspaces
- `apps/web` - Next.js 16 web application
- `apps/mobile` - placeholder (no app yet)

### Monorepo Constraints

**React version must stay in sync** across all apps and packages. pnpm's strict dependency isolation means version mismatches cause multiple React instances, leading to "Invalid hook call" errors. When upgrading React, update all workspaces together.

## Tooling

- pnpm workspace with Turbo tasks
- Husky hooks configured at repo root

## Environment Variables

- `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox token for maps in `apps/web`
- `FONTAWESOME_NPM_AUTH_TOKEN` - Font Awesome Pro registry auth (required for install)

## Icons

- Font Awesome Pro is the standard icon set (solid + regular + brands)

## Commits

Use semantic commit style (`type(scope): message`). Keep messages as one-liners, succinct but covering work done. Do not attribute Claude in commit messages.

## GitHub CLI

Use `gh` CLI when referencing GitHub repos that I own or public repos (e.g., `gh repo view`, `gh issue list`, `gh pr list`).
