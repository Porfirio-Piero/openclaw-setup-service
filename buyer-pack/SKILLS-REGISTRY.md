# Skills Registry — Buyer Pack Templates

**Source of Truth:** `skills-templates/`

**Last Updated:** 2026-07-18

---

## Purpose

This registry indexes the five skill templates included in the OpenClaw Setup Service buyer pack. Each skill has a SKILL.md file defining its purpose, scope, and usage.

---

## Skill Templates

| Skill | Directory | Category | Purpose |
|-------|-----------|----------|---------|
| **Browser Automation** | `skills-templates/browser-automation/` | Automation | Web browser control, scraping, form filling, testing |
| **Orchestration** | `skills-templates/orchestration/` | Orchestration | Fleet coordination, delegation, multi-agent workflows |
| **GitHub** | `skills-templates/github/` | Integration | Issues, PRs, CI logs, releases via `gh` CLI |
| **Web Research** | `skills-templates/web-research/` | Research | Web search, content extraction, research workflows |
| **Security Review** | `skills-templates/security-review/` | Security | Auth audit, endpoint review, secrets management, vulnerability check |

---

## Skill Structure

Each skill follows the standard OpenClaw SKILL.md format:

| Section | Description |
|---------|-------------|
| **Purpose** | What the skill does |
| **Scope** | What it covers |
| **When to Use** | Appropriate use cases |
| **When NOT to Use** | Where it doesn't apply |
| **Source of Truth** | File location |
| **Key Operations** | Available actions |
| **Workflow Patterns** | Example usage patterns |

---

## Agent-Skill Assignments

| Agent | Primary Skills |
|-------|---------------|
| Executive Orchestrator | orchestration, github, web-research |
| Sr. Developer Agent | github, browser-automation |
| QA & Security Agent | security-review, browser-automation |
| Architecture Agent | github, web-research |
| Chief of Staff | orchestration, web-research |
| Intelligence Scout | web-research |

---

## Adding More Skills

1. Create a new directory under `workspace/skills/<skill-name>/`
2. Add a `SKILL.md` file with Purpose/Scope/When to Use/Source of Truth structure
3. Update this registry with the new skill entry
4. Reference the skill in agent files as needed

Browse bundled skills in `node_modules/openclaw/skills/` for additional read-only capabilities (weather, github, notion, slack, etc.).