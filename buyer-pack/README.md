# OpenClaw Setup Service — Buyer Pack

Welcome to your OpenClaw Setup Service deliverable. This pack contains everything you need to get a personalized AI agent fleet running in under 15 minutes.

---

## What's Inside

```
buyer-pack/
├── README.md                  ← you are here
├── GETTING-STARTED.md         ← 15-minute setup guide
├── onboarding-form.html       ← tell us about your goals & preferences
├── agent-templates/           ← 6 ready-to-customize agent identities
│   ├── executive-orchestrator/
│   ├── sr-developer/
│   ├── qa-security/
│   ├── architecture/
│   ├── chief-of-staff/
│   └── intelligence-scout/
├── skills-templates/          ← 5 skill templates for common tasks
│   ├── browser-automation/
│   ├── orchestration/
│   ├── github/
│   ├── web-research/
│   └── security-review/
├── cron-recipes.md            ← example scheduled jobs
├── AGENTS-REGISTRY.md         ← agent template index
└── SKILLS-REGISTRY.md         ← skill template index
```

---

## What You Get

### 6 Agent Templates

Each agent has four identity files (SOUL.md, IDENTITY.md, BEHAVIOR.md, PHRASES.md) that define its personality, role, communication style, and vocabulary. These are **generic templates** — personalize them with your name, projects, and preferences during onboarding.

| Agent | Role | Best For |
|-------|------|----------|
| **Executive Orchestrator** | Boss of bosses | Direct chat, delegation, overall coordination |
| **Sr. Developer Agent** | Construction specialist | Building features, overnight builds, shipping code |
| **QA & Security Agent** | Demolition & testing | Breaking things before they break in production |
| **Architecture Agent** | Systems architect | Deep refactors, data integrity, repo-scale analysis |
| **Chief of Staff** | Operations coordinator | Status reports, pipeline management, routing |
| **Intelligence Scout** | AI model researcher | Weekly AI landscape reports, trend spotting |

### 5 Skill Templates

| Skill | Purpose |
|-------|---------|
| **Browser Automation** | Control web browsers for scraping, testing, form filling |
| **Orchestration** | Main coordinator skill for the executive agent |
| **GitHub** | Issues, PRs, CI logs, releases via `gh` CLI |
| **Web Research** | Search and extract content from the web |
| **Security Review** | Audit auth, endpoints, secrets, and uploads |

### Cron Recipes

Pre-built scheduled job examples for:
- Morning briefings
- Weekly AI model intelligence reports
- Security heartbeat checks
- Resource steward audits

---

## Quick Start

1. **Install OpenClaw** — see [GETTING-STARTED.md](GETTING-STARTED.md)
2. **Fill out the onboarding form** — open `onboarding-form.html` in any browser
3. **Import agent templates** — copy `agent-templates/` into your OpenClaw workspace
4. **Import skill templates** — copy `skills-templates/` into your OpenClaw workspace
5. **Set up cron jobs** — use recipes from `cron-recipes.md`
6. **Personalize** — replace `[YOUR NAME]`, `[YOUR PROJECTS]`, and other placeholders

Total time: ~15 minutes.

---

## Support

- **OpenClaw Docs:** https://docs.openclaw.dev
- **Onboarding Email:** Send your completed onboarding form to your setup specialist
- **Community:** Join the OpenClaw Discord for help and tips

---

## Important Notes

- These templates contain **no personal data** — they're clean slates for your customization
- All agent identities are generic. Add your name, projects, and preferences to make them yours
- Skill templates follow the standard OpenClaw SKILL.md structure
- Cron recipes are examples — adjust schedules to your timezone and needs

---

*Built with OpenClaw Setup Service.*