# Repository Guide

## Repo Structure

- `ARCHITECTURE.md` — system architecture map
- `ETHOS.md` — principles that shape how to think, recommend, and build
- `package.json` / `package-lock.json` — root check scripts and Knip installation
- `knip.json` — required Knip configuration inherited by child repositories
- `.github/workflows/knip-approval.yml` — Knip merge-gate CI check
- `.codex/skills/` and `.claude/skills/` — repository-local agent skills
- `docs/ENGINEERING.md` — engineering rules
- `docs/ENGINEERING_EXAMPLES.md` — concrete examples and anti-patterns for coding tasks
- `docs/SUBAGENTS.md` — how to add or update a subagent (Codex and Claude Code)

## Core Engineering Principle

Choose the simplest solution that fully solves the task.

- Prefer clear, explicit code over clever abstractions.
- Make the smallest change that preserves correctness, tests, and error handling.
- Avoid adding layers, helpers, files, or indirection unless they clearly reduce overall complexity.
- When extra complexity is necessary, keep it local and make the reason obvious in names, structure, or a brief comment.

## Coding Task Bootstrap

Treat this file as the repository map, not the full manual.

For any coding, debugging, refactoring, or code review task, load these documents before making changes:

- `ARCHITECTURE.md` — first principles that shape how you should think about code.
- `ETHOS.md` — principles that shape how you should think, recommend, and build.
- `docs/ENGINEERING.md` — permanent repo-wide coding rules and behavioral guardrails.
- `docs/ENGINEERING_EXAMPLES.md` — concrete examples of what good and bad execution look like.

## OpenSpec Workflow

OpenSpec workspace state is intentionally ignored through `.openspec/` so local
proposal and spec artifacts do not clutter the repository. When a task should
follow the OpenSpec flow, initialize it locally with `openspec init` and keep
the generated OpenSpec state out of Git.
