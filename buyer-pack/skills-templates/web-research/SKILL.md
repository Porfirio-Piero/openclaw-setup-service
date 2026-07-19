# SKILL.md — Web Research

## Purpose

Search the web, extract content from URLs, and gather information for agent workflows. Combines web search and content extraction capabilities into a structured research skill.

## Scope

- Web search via configured search provider
- Content extraction from URLs (HTML → markdown/text)
- Research workflows: search → fetch → summarize
- Source evaluation and fact-checking
- Multi-query research with result aggregation
- Real-time information gathering

## When to Use

- Looking up current information, news, or trends
- Researching a topic across multiple sources
- Extracting content from a specific URL
- Fact-checking claims with web sources
- Gathering data for reports or briefings
- Finding documentation or API references

## When NOT to Use

- Content you already have in local files (read the file)
- Tasks requiring browser interaction (use browser automation)
- Tasks requiring API authentication (use the appropriate integration skill)

## Source of Truth

This skill template lives in `workspace/skills/web-research/SKILL.md`.
Uses the OpenClaw `web_search` and `web_fetch` tools.

## Key Operations

| Operation | Tool | Description |
|-----------|------|-------------|
| Web search | `web_search query="..."` | Search the web |
| Fetch URL | `web_fetch url="..."` | Extract content from a page |
| Fetch as markdown | `web_fetch url="..." extractMode="markdown"` | Clean markdown output |
| Fetch as text | `web_fetch url="..." extractMode="text"` | Plain text output |
| Search with filters | `web_search query="..." freshness="week"` | Time-filtered search |

## Research Workflow Pattern

1. **Search** — Start with `web_search` to find relevant sources
2. **Evaluate** — Review search results for relevance and credibility
3. **Fetch** — Use `web_fetch` to extract full content from top sources
4. **Cross-reference** — Fetch 2-3 sources to verify key claims
5. **Summarize** — Synthesize findings into a concise report
6. **Cite** — Always include source URLs in the output

## Search Tips

- Use `freshness="day"` for breaking news
- Use `freshness="week"` for recent developments
- Use `freshness="month"` for broader trends
- Use `country="US"` (or your region) for localized results
- Use `count=10` to get more results for thorough research

## Quality Rules

1. **Always cite sources.** Include URLs for every claim.
2. **Cross-reference important claims.** Don't rely on a single source.
3. **Distinguish fact from opinion.** Label them clearly.
4. **Note when information may be outdated.** Include fetch dates.
5. **Prefer primary sources** over aggregators or summaries.