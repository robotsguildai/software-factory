# open-software-factory — Product Overview

## Business Problem

- Product requirements are written in meetings, Telegram, and Slack. They are out of sync with each other and with the code.
- Specs go stale after code ships because nothing reconciles them with pull requests.
- The hosted 8090 Software Factory solves this but costs money, holds our data, and cannot be extended on our own roadmap.

## Current State

- Coding agents (Claude Code, Codex) execute work orders through the 8090 MCP tools and the portable `software-factory` skill.
- Non-engineers have no place to write specs and use chat instead.

## Personas

| Persona | Goal | Success condition |
|---|---|---|
| Builder and operator (the author) | Ship more PRs per week across all products | Every work order starts from a written spec in one place |
| Engineer (member) | Execute work orders with their own coding agent | Agent can read the spec and work order and write results back without a human relaying |
| Founder or client (member) | Write and review product requirements | Can draft a spec from ChatGPT or Claude and read teammates' comments in one place |

## Product Description

An open-source, self-hosted system of record for product requirements and work orders, used by humans through a web app and by AI through a remote MCP server and a CLI.

```
                 ┌────────────────────────────┐
  ChatGPT/Claude │  remote MCP  (/mcp)        │
  ───OAuth 2.1──▶│                            │
                 │  Next.js app               │      ┌──────────┐
  Coding agent   │  REST /api/v1              │◀────▶│ Postgres │
  ───API key────▶│  (CLI wraps this)          │      └──────────┘
                 │                            │
  Browser        │  Web UI: editor, comments  │
  ───session────▶│                            │
                 └────────────────────────────┘
                    one VPS, Docker compose
```

### Domain model

- **User** → owns or belongs to **Projects**.
- **Project** → has members with roles owner, admin, member. Clients get their own project.
- **Workspace** → belongs to a project. One workspace equals one GitHub repository.
- **Requirement** → belongs to a workspace. Two types: one Product Overview Document per workspace, many Feature Requirements Documents. Body is markdown.
- **Work Order** → belongs to a workspace. Statuses: draft, ready, in progress, in review, done. Moving to review requires a PR URL. Carries the implementation plan and execution artifacts as markdown. Exact fields: deferred.
- **Comment thread** → attached to a requirement or work order at document level, resolvable.
- **Suggestion** → an old-text to new-text edit proposed by an agent, shown as a diff, accepted or rejected by a human. Humans edit directly; agents only suggest.
- **Version** → every accepted change to a requirement or work order body is kept.

Out of scope for v1: blueprints, phases, test cases, feedback, themes, skills, real-time co-editing, inline comment anchors, Telegram or Slack ingestion, per-workspace access control, Sign in with ChatGPT.

### Delivery order

1. **Slice 1**: auth, projects, workspaces, requirements, work orders, comments, suggestions, REST API, CLI, MCP server.
2. **Slice 2**: MCP prompts and resources that carry the requirements-writing guide so a founder's ChatGPT can interview them and draft a spec.
3. **Slice 3**: GitHub App that checks pull requests for spec drift and proposes suggestions. Design deferred.

## Success Metrics

- Primary: pull requests shipped per week across all products. Baseline not yet measured.
- Leading: share of merged PRs that link to a work order with a written requirement.

## Technical Requirements

- **No AI on the server.** All model calls happen in the user's own ChatGPT, Claude, or coding agent. The server exposes data, prompts, and tools only.
- **Self-hosted everything.** One VPS, Docker compose with Next.js, Postgres, and a TLS proxy.
- **Auth**: Better Auth with Google, GitHub, passkeys, and the `@better-auth/mcp` plugin so the app is an OAuth 2.1 server for MCP clients. Magic link deferred until SMTP is chosen. Sign in with ChatGPT deferred until OpenAI opens it.
- **CLI auth**: personal access token via Better Auth's API key plugin.
- **Data**: Postgres through Drizzle. Tables are declared in TypeScript under `apps/web/src/db/schema`, one file per domain, with explicit snake_case column names, so the current schema is readable in one place. `drizzle-kit generate` derives numbered SQL migrations that are reviewed in pull requests and applied with `drizzle-kit migrate`. Never `drizzle-kit push`.
- **API**: REST under `/api/v1` with zod schemas in a shared package. The CLI and MCP tools are thin wrappers over the same handlers.
- **MCP**: route handler inside the Next.js app, MCP TypeScript SDK v2, streamable HTTP.
- **Documents**: markdown stored as text everywhere. CodeMirror 6 editor with preview. No rich-text editor in v1.
- **Repo**: npm workspaces with `apps/web`, `packages/cli`, `packages/shared`. No Turborepo.
- **CI**: Knip only.
- **Domain**: localhost until a domain is chosen. Callback URLs and passkey relying-party ID come from one environment variable.
- **Versions**: latest stable Next.js, Node, and Postgres.
- Existing `ARCHITECTURE.md`, `ETHOS.md`, and `docs/ENGINEERING.md` remain the coding rules for this codebase.

## Open Decisions

- Work order fields beyond title, description, status, assignee, PR URL, and markdown bodies.
- GitHub App: how a PR is linked to a work order, trigger events, and where its output lands.
- Domain name and SMTP provider.
- Per-workspace ID prefix scheme.
