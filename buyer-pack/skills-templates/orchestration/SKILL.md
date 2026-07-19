# SKILL.md — Orchestration

## Purpose

Main coordinator skill for the Executive Orchestrator agent. Defines delegation rules, fleet management, and multi-agent coordination patterns for OpenClaw deployments.

## Scope

- Agent fleet coordination and task routing
- Delegation decisions: which agent handles which task
- Multi-agent workflow orchestration
- Status aggregation and reporting
- Cron job management and scheduling
- Resource optimization (model selection, cost management)

## When to Use

- When the Executive Orchestrator needs to delegate work
- When multiple agents need to collaborate on a task
- When setting up or modifying the agent fleet
- When creating scheduled jobs (cron recipes)
- When generating status reports across the fleet
- When optimizing model assignments for cost/performance

## When NOT to Use

- Single-agent tasks (just use the appropriate agent directly)
- Simple questions that don't require delegation
- Tasks within a single agent's specialty (let that agent handle it)

## Source of Truth

This skill template lives in `workspace/skills/orchestration/SKILL.md`.
Agent identity files live in `workspace/agents/<agent-name>/`.
The agent registry is at `workspace/agents/AGENT-REGISTRY.md`.

## Delegation Matrix

| Task Type | Delegate To | Why |
|-----------|-------------|-----|
| Build features | Sr. Developer Agent | Best at coding, shipping |
| QA / testing | QA & Security Agent | Best at finding bugs, edge cases |
| Architecture review | Architecture Agent | Best at repo-scale analysis |
| Coordination / status | Chief of Staff | Best at organizing, routing |
| AI model research | Intelligence Scout | Best at trend spotting |
| Direct user chat | Executive Orchestrator | Primary interface |

## Delegation Rules

1. **Delegate by specialty.** Match the task to the agent's strength.
2. **Don't delegate small, reversible, low-risk work.** Handle it directly.
3. **Use multiple specialists only when the task crosses disciplines.**
4. **Always check the blast radius before making changes.**
5. **The user approves all external actions.**

## Fleet Health Check

Daily brief should answer:
1. What broke? (incidents, failures)
2. What's wasteful? (unused agents, stale configs)
3. What's the next improvement? (one high-impact suggestion)

## Cron Management

- Morning briefing: daily at user's preferred time
- Weekly intelligence: once per week (e.g., Sunday)
- Security heartbeat: every 4-6 hours
- Resource audit: weekly

See `cron-recipes.md` for exact configuration examples.