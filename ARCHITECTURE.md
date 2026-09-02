### I. Minimal Implementation

Every feature MUST be implemented with minimal code focused on core functionality. Avoid unnecessary helper functions, verbose code, or features not directly supporting the goal. Simplicity over complexity is mandatory.

### II. Pragmatic Testing

Agents MUST only write tests they can reliably execute in isolation. Focus on simple unit tests for pure functions that don't depend on external systems. NEVER write integration tests, E2E tests, or tests requiring external service integration. AVOID testing environment variables, analytics, logging, or infrastructure concerns. Tests MUST provide actual value, not false confidence.

### III. Code Reuse First

Agents MUST study the existing repository for implementations before creating new code. ALWAYS reuse existing components, utilities, patterns, and solutions where possible. Only create new implementations when existing code cannot fulfill the requirement. Document the search for existing solutions and justify any new implementation.

### IV. Filesystem-First Legibility

Agents MUST treat the filesystem as a primary interface for both humans and agentic tools. Directory structure, file names, and module boundaries MUST communicate purpose without requiring the file to be opened.

Agents MUST use explicit, domain-specific paths such as `billing/invoices/compute.ts` instead of vague paths such as `utils/helpers.ts` whenever the file serves a concrete business or product purpose.

Agents MUST prefer many small, well-scoped files over large multi-purpose files when that split keeps the system clearer. Keep files narrow enough that they can usually be loaded in full without summarization or truncation.

Do NOT hide business meaning behind generic folders, generic filenames, or oversized catch-all modules. If a file or directory name does not help answer "what is this?" or "where does this belong?", rename or restructure it.

### V. Semantic

Agents MUST encode domain meaning in the type system whenever doing so is reasonable and keeps the code clear.

Type names MUST carry semantic meaning. Prefer names such as `UserId`, `WorkspaceSlug`, or `SignedWebhookPayload` over generic names that hide intent.

Agents MUST use the type system to make data shape, ownership, and allowed flows obvious at a glance. The goal is for a reader or tool to quickly answer what a value represents and where it belongs.

Agents MUST NOT use generic type names such as `T`, `Data`, `Payload`, or `Result` for business-domain concepts unless the code is a truly small, local generic abstraction. In product code, use specific names that improve searchability and comprehension.
