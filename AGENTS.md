# Repository Guide

## Repo Structure

- `constitution.md` — rules for coding agents
- `docs/PRODUCT.md` - current product description
- `apps/web` — Next.js app: web UI, REST API, MCP server
- `packages/*` — shared code and the CLI (added as they are needed)
- `tsconfig.base.json` — compiler options every workspace extends
- `knip.json` — Knip workspace configuration, the only CI check

## Commands

- `npm run dev` — start the web app
- `npm run check:all` — typecheck every workspace, then run Knip
