---
name: split-large-file
description: Split one large or multi-purpose file into many small, well-scoped files. Use when the user asks to break apart, decompose, untangle, or refactor a large file so each file has one clear responsibility and can usually be loaded in full.
---

# Split Large File

Use this skill to make the filesystem explain the code.

**Principle:** Agents MUST prefer many small, well-scoped files over large multi-purpose files when that split keeps the system clearer. Keep files narrow enough that they can usually be loaded in full without summarization or truncation.

## Workflow

1. Read the target file and nearby import/export call sites.
2. Identify natural boundaries: domain concepts, UI components, hooks, handlers, schemas/types, pure helpers, side effects, and integration edges.
3. Split only where the boundary improves clarity. Avoid vague buckets like `utils`, `helpers`, or `misc` unless the repo already has a specific local convention.
4. Preserve behavior. Move code first, then update imports and exports surgically.
5. Keep public APIs stable when practical; otherwise update every call site in the same change.
6. Run the smallest useful verification available, usually typecheck or build. Do not add tests unless the user explicitly asks.

## Output

Report the new file map, why each boundary exists, and the verification command/result.
