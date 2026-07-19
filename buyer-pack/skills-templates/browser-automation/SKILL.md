# SKILL.md — Browser Automation

## Purpose

Control web browsers for scraping, form filling, testing, and automated interaction with web applications. Provides structured browser control via OpenClaw's built-in browser tool.

## Scope

- Navigate to URLs and extract page content
- Fill forms, click buttons, select options
- Take screenshots and snapshots of page state
- Multi-tab management
- Session persistence for logged-in workflows
- Headless and headed browser modes

## When to Use

- Web scraping and data extraction
- Automated form submission
- End-to-end web application testing
- Screenshot capture for documentation
- Interaction with web UIs that lack APIs
- Session-based workflows requiring login state

## When NOT to Use

- Simple API calls (use `web_fetch` or direct HTTP instead)
- Static content extraction (use `web_fetch` with markdown mode)
- Tasks requiring human judgment on visual content (use `image` tool instead)

## Source of Truth

This skill template lives in `workspace/skills/browser-automation/SKILL.md`.
Bundled browser automation capabilities are available via the OpenClaw `browser` tool.

## Key Operations

| Operation | Tool Action | Description |
|-----------|-------------|-------------|
| Start browser | `browser action=start` | Launch managed browser |
| Open URL | `browser action=open` | Open a new tab with URL |
| Snapshot | `browser action=snapshot` | Capture page structure + element refs |
| Screenshot | `browser action=screenshot` | Capture visual screenshot |
| Click element | `browser action=act kind=click` | Click an element by ref |
| Type text | `browser action=act kind=type` | Type into an input field |
| Press key | `browser action=act kind=press` | Press a keyboard key |
| Navigate | `browser action=navigate` | Navigate current tab to URL |
| List tabs | `browser action=tabs` | Show all open tabs |
| Close tab | `browser action=close` | Close a specific tab |

## Workflow Pattern

1. `browser action=start` — launch the browser
2. `browser action=open targetUrl="https://example.com"` — open the target
3. `browser action=snapshot` — get element references (e.g., `e12`)
4. `browser action=act kind=click ref="e12"` — interact with elements
5. `browser action=act kind=type ref="e15" text="hello"` — fill inputs
6. `browser action=screenshot` — capture the result
7. `browser action=close` — clean up

## Notes

- Use `refs="aria"` for stable element references across calls
- Browser sessions are isolated by default; use `profile="user"` for existing logins
- Always clean up with `action=close` or `action=stop` when done