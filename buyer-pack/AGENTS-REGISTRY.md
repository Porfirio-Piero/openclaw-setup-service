# Agent Registry — Buyer Pack Templates

**Source of Truth:** `agent-templates/`

**Last Updated:** 2026-07-18

---

## Purpose

This registry indexes the six agent templates included in the OpenClaw Setup Service buyer pack. Each agent has four identity files: SOUL.md, IDENTITY.md, BEHAVIOR.md, PHRASES.md.

---

## Agent Templates

| Agent | Directory | Role | Model (placeholder) |
|-------|-----------|------|---------------------|
| **Executive Orchestrator** | `agent-templates/executive-orchestrator/` | Primary agent, delegation, direct chat | `[YOUR MODEL]` |
| **Sr. Developer Agent** | `agent-templates/sr-developer/` | Build features, overnight builds, shipping code | `[YOUR MODEL]` |
| **QA & Security Agent** | `agent-templates/qa-security/` | Testing, security audit, edge cases, stress testing | `[YOUR MODEL]` |
| **Architecture Agent** | `agent-templates/architecture/` | Deep refactors, repo-scale analysis, data integrity | `[YOUR MODEL]` |
| **Chief of Staff** | `agent-templates/chief-of-staff/` | Coordination, status reports, pipeline management | `[YOUR MODEL]` |
| **Intelligence Scout** | `agent-templates/intelligence-scout/` | Weekly AI model intelligence, trend spotting | `[YOUR MODEL]` |

---

## Files Per Agent

| File | Purpose |
|------|---------|
| `SOUL.md` | Core identity, personality, principles, boundaries |
| `IDENTITY.md` | Name, model, emoji, speech patterns, signature phrases |
| `BEHAVIOR.md` | Behavioral profile: temperament, communication style, guardrails |
| `PHRASES.md` | Phrase bank with context, intensity, and usage rules |

---

## Customization

All templates contain `[YOUR ...]` placeholders. Replace them during onboarding:

- `[YOUR NAME]` → your actual name
- `[YOUR PREFERRED MODEL]` → your model choice (e.g., `ollama/kimi-k2.7-code:cloud`)
- `[YOUR PROJECTS]` → your real projects
- `[YOUR TIMEZONE]` → your timezone

---

## Delegation Model

```
User ← → Executive Orchestrator
              ├── Sr. Developer Agent (build)
              ├── QA & Security Agent (test/break)
              ├── Architecture Agent (design/refactor)
              ├── Chief of Staff (coordinate/report)
              └── Intelligence Scout (research/trends)
```

The Executive Orchestrator handles normal work directly. Specialists are invoked when their expertise materially improves the outcome.