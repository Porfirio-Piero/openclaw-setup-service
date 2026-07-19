# Cron Recipes — OpenClaw Scheduled Jobs

Example cron entries for common automated workflows. Adjust schedules to your timezone and preferences.

---

## 1. Morning Briefing (Daily)

A daily summary of what happened overnight, what's on the agenda, and what needs attention.

```yaml
# Cron: Every day at 8:00 AM (user timezone)
schedule: "0 8 * * *"
agent: chief-of-staff
task: |
  Generate the daily briefing:
  1. Check for overnight incidents (failed cron jobs, channel drops, errors)
  2. List today's scheduled tasks and deadlines
  3. Summarize any open items from yesterday
  4. Flag anything requiring user attention
  Format: concise bullet points, lead with impact.
```

### Alternative: Executive Orchestrator
```yaml
schedule: "0 7 * * *"
agent: executive-orchestrator
task: |
  Morning check-in:
  - System status (all agents online, gateway healthy)
  - Overnight builds or tasks completed
  - Today's priorities (top 3)
  - Anything blocking
```

---

## 2. Weekly Model Intelligence (Weekly)

The Intelligence Scout's street report on the AI landscape.

```yaml
# Cron: Every Sunday at 9:00 AM (user timezone)
schedule: "0 9 * * 0"
agent: intelligence-scout
task: |
  Generate the weekly AI model intelligence report:
  1. New model releases this week (name, provider, key claims)
  2. Benchmark movements (leaderboard changes, notable results)
  3. Community sentiment (Reddit, HN, Twitter discussions)
  4. Pricing changes or new offerings
  5. Recommendations: what to try, what to watch, what to ignore
  Format: punchy headlines, evidence-based, distinguish fact from buzz.
  Keep it concise — 5-10 key items, not a research paper.
```

---

## 3. Security Heartbeat (Every 4 Hours)

Regular security check to catch issues early.

```yaml
# Cron: Every 4 hours
schedule: "0 */4 * * *"
agent: qa-security
task: |
  Security heartbeat check:
  1. Check for failed login attempts (last 4 hours)
  2. Verify all expected services are running
  3. Check for new open ports or firewall changes
  4. Scan error logs for security-relevant events
  5. Verify SSL certificates are valid
  6. Check for out-of-date dependencies with known vulnerabilities
  Report: only if issues found. "All clear" if nothing.
  Severity: Critical / High / Medium / Low for any findings.
```

---

## 4. Resource Steward (Weekly)

Weekly audit of system resources, storage, and configuration health.

```yaml
# Cron: Every Sunday at 10:00 AM (user timezone)
schedule: "0 10 * * 0"
agent: chief-of-staff
task: |
  Weekly resource steward audit:
  1. Disk usage on all drives (flag > 80%)
  2. Memory and CPU trends (any spikes?)
  3. Agent fleet review: unused agents, stale configs
  4. Skill review: broken skills, missing dependencies
  5. Cron job review: any failing or redundant jobs
  6. Config backup verification
  7. Cleanup recommendations (with business case for each)
  Format: structured report, lead with waste, end with improvement opportunity.
```

---

## 5. GitHub Watch (Daily)

Check GitHub repositories for new issues, PRs, and CI failures.

```yaml
# Cron: Every day at 9:00 AM (user timezone)
schedule: "0 9 * * *"
agent: executive-orchestrator
task: |
  GitHub daily check:
  1. List open PRs awaiting review
  2. Check for failed CI runs in last 24 hours
  3. List new issues created since last check
  4. Flag any PRs with merge conflicts
  5. Check for stale branches (no commits in 30+ days)
  Report: bullet points, actionable items first.
```

---

## 6. Web Research Monitor (Configurable)

Monitor specific topics or sources for new information.

```yaml
# Cron: Every 6 hours
schedule: "0 */6 * * *"
agent: intelligence-scout
task: |
  Topic monitor: [YOUR TOPICS]
  1. Search for new developments in: [topic1, topic2, topic3]
  2. Check specific RSS feeds: [feed URLs]
  3. Summarize anything new since last check
  4. Flag items that require action vs. informational only
  Report: only if new findings. "Nothing new" if quiet.
```

---

## How to Add Cron Jobs in OpenClaw

### Via Gateway Config
Add entries to your OpenClaw gateway configuration:

```yaml
scheduler:
  jobs:
    - id: morning-briefing
      schedule: "0 8 * * *"
      agent: chief-of-staff
      task: "Generate daily briefing"
    - id: weekly-intelligence
      schedule: "0 9 * * 0"
      agent: intelligence-scout
      task: "Weekly AI model intelligence report"
```

### Via CLI
```bash
openclaw cron add --schedule "0 8 * * *" --agent chief-of-staff --task "Daily briefing"
```

### Via Agent Command
Ask the Executive Orchestrator: "Set up a daily 8 AM briefing with Chief of Staff."

---

## Cron Schedule Cheat Sheet

| Pattern | Meaning |
|---------|---------|
| `0 8 * * *` | Every day at 8:00 AM |
| `0 9 * * 0` | Every Sunday at 9:00 AM |
| `0 */4 * * *` | Every 4 hours |
| `0 */6 * * *` | Every 6 hours |
| `0 0 * * 1` | Every Monday at midnight |
| `0 17 * * 5` | Every Friday at 5:00 PM |
| `0 0 1 * *` | First of every month at midnight |

---

*Adjust all schedules to your timezone. The cron expressions use standard 5-field format.*