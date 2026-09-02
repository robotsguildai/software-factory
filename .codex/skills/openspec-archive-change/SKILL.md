---
name: openspec-archive-change
description: Archive a completed change in the experimental workflow. Use when the user wants to finalize and archive a change after implementation is complete.
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.3.0"
---

Archive a completed change in the experimental workflow.

**Input**: Optionally specify a change name. If omitted, infer the change from conversation context when clear; otherwise inspect active changes and auto-select the only active change. Prompt only when multiple active changes remain plausible.

**Steps**

1. **Select the change**

   If a change name was provided, use it.

   If no change name was provided:
   - Infer from conversation context when a current change/proposal is clear
   - Otherwise run `openspec list --json` to get available changes
   - If exactly one active change exists, auto-select it
   - If no active changes exist, report that there is nothing to archive
   - If multiple active changes exist and context is unclear, use the **AskUserQuestion tool** to let the user select

   Show only active changes (not already archived).
   Include the schema used for each change if available.

   Always announce: "Using change: <name>" and how to override (e.g., `/opsx:archive <other>`).

   **IMPORTANT**: Do not prompt when exactly one active change exists or conversation context clearly identifies the intended change.

2. **Check artifact completion status**

   Run `openspec status --change "<name>" --json` to check artifact completion.

   Parse the JSON to understand:
   - `schemaName`: The workflow being used
   - `artifacts`: List of artifacts with their status (`done` or other)

   **If any artifacts are not `done`:**
   - Display warning listing incomplete artifacts
   - Use **AskUserQuestion tool** to confirm user wants to proceed
   - Proceed if user confirms

3. **Check task completion status**

   Read the tasks file (typically `tasks.md`) to check for incomplete tasks.

   Count tasks marked with `- [ ]` (incomplete) vs `- [x]` (complete).

   **If incomplete tasks found:**
   - Display warning showing count of incomplete tasks
   - Use **AskUserQuestion tool** to confirm user wants to proceed
   - Proceed if user confirms

   **If no tasks file exists:** Proceed without task-related warning.

4. **Assess delta spec sync state**

   Check for delta specs at `openspec/changes/<name>/specs/`. If none exist, proceed without sync-related notes.

   **If delta specs exist:**
   - Compare each delta spec with its corresponding main spec at `openspec/specs/<capability>/spec.md`
   - Determine what changes would be applied (adds, modifications, removals, renames)
   - Show a combined summary before archiving
   - Let `openspec archive "<name>" --yes` sync the delta specs into the main specs automatically
   - Do not ask whether to sync and do not offer an "archive without syncing" option

   If sync/archive fails, stop and report the blocker; do not manually move the change to archive.

5. **Perform the archive**

   ```bash
   openspec archive "<name>" --yes
   ```

   Do not pass `--skip-specs`. The archive command updates main specs for delta specs and moves the change to `openspec/changes/archive/YYYY-MM-DD-<name>/`.

   **If target already exists:** Fail with error, suggest renaming existing archive or using a different date.

6. **Display summary**

   Show archive completion summary including:
   - Change name
   - Schema that was used
   - Archive location
   - Spec sync status (synced / no delta specs)
   - Note about any warnings (incomplete artifacts/tasks)

**Output On Success**

```
## Archive Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs:** ✓ Synced to main specs (or "No delta specs")

All artifacts complete. All tasks complete.
```

**Guardrails**
- Auto-select the inferred/current change, or the only active change, when no name is provided
- Prompt for change selection only when multiple active changes are plausible and context is unclear
- Use artifact graph (openspec status --json) for completion checking
- Don't block archive on warnings - just inform and confirm
- Preserve .openspec.yaml when moving to archive (it moves with the directory)
- Show clear summary of what happened
- Use `openspec archive "<name>" --yes` so CLI confirmation prompts are skipped after skill-level checks
- Never pass `--skip-specs`
- If delta specs exist, always run the sync assessment and show the combined summary before archive
- Never ask whether to sync and never archive without syncing delta specs
- If sync/archive fails, do not manually move the change; report the failure
