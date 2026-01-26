---
description: How to add or edit Claude Code rules in this project
globs:
---
# Claude Code Rules Guide

How to add and manage Claude Code rules for this project.

## Rules Location

All rule files live in the `.claude/rules/` directory:

```
.claude/rules/
├── claude-rules.md           # This meta-guide
├── prismic-mcp.md            # Prismic MCP server usage
├── server-client-boundaries.md # Next.js component boundaries
├── motion-animations.md      # CSS animation guidelines
├── stylex-authoring.md       # StyleX style guide
└── ...
```

## File Format

Rule files are standard Markdown (`.md`) with optional YAML frontmatter:

````md
---
description: Short description of when this rule should apply
globs: "src/**/*.tsx"
---
# Rule Title

Main content explaining the rule with markdown formatting.

1. Step-by-step instructions
2. Code examples
3. Guidelines

```typescript
// Good example
function goodExample() {
  // Implementation following guidelines
}

// Bad example
function badExample() {
  // Implementation not following guidelines
}
```
````

## Frontmatter Fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Explains what the rule is for. Claude uses this to decide when to apply the rule on its own. |
| `globs` | string or string[] | File patterns that trigger this rule automatically when those files are being edited. Uses glob syntax (e.g. `"src/**/*.tsx"`, `"**/*.{ts,tsx}"`). |

### How Rules Are Applied

Rules are loaded based on their frontmatter configuration:

- **`globs` set**: Rule is automatically applied when working with files matching the pattern
- **`description` only** (no globs): Claude decides whether the rule is relevant based on the description and current task context
- **Neither set**: Rule must be referenced manually (e.g. via `CLAUDE.md`)

## Naming Conventions

- Use **kebab-case** for filenames
- Use the `.md` extension
- Make names descriptive of the rule's purpose
- Examples: `server-client-boundaries.md`, `motion-animations.md`, `stylex-authoring.md`

## Writing Good Rules

1. **Be specific**: Rules should cover one topic clearly
2. **Include examples**: Show both correct and incorrect patterns
3. **Use code blocks**: Demonstrate with real TypeScript/React examples from the project
4. **Explain the "why"**: Help Claude understand the reasoning, not just the what
5. **Keep scope narrow**: A rule about animations shouldn't also cover styling conventions
6. **Use glob patterns**: Scope rules to relevant file types to avoid noise

## Project-Level Instructions: `CLAUDE.md`

For rules that should always apply regardless of which files are being edited, add them to the root `CLAUDE.md` file instead:

```
PROJECT_ROOT/
├── CLAUDE.md              # Always-applied project instructions
├── .claude/
│   ├── mcp.json           # MCP server configuration
│   └── rules/
│       └── *.md           # Contextual rules
└── ...
```

`CLAUDE.md` is ideal for:
- Project architecture overview
- General coding conventions
- Technology stack decisions
- Workflow preferences

## MCP Server Configuration

MCP servers are configured in `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name@latest"]
    }
  }
}
```

## Tips

- Don't duplicate content across rules — keep each rule focused on its domain
- If a rule grows too large, split it into multiple targeted rules
- Rules with globs are more efficient — they only load when relevant files are in context
- Review rules periodically to keep them current with project changes
- Rules apply to Claude Code (CLI), not to any specific IDE
