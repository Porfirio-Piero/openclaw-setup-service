# Getting Started — 15-Minute Setup

This guide walks you through installing OpenClaw, importing your agent and skill templates, and getting your fleet running.

---

## Prerequisites

- **Node.js 20+** installed on your machine
- **A Telegram account** (or other messaging platform) for chat access
- **An OpenAI API key** OR **Ollama** running locally (for model access)
- **Git** installed (for GitHub skill)

---

## Step 1: Install OpenClaw (3 minutes)

```bash
npm install -g openclaw
```

Verify installation:

```bash
openclaw --version
```

Initialize your workspace:

```bash
openclaw init
```

This creates a workspace directory at `~/.openclaw/workspace/` with default configuration files.

---

## Step 2: Configure Your Model (2 minutes)

OpenClaw needs at least one AI model configured. Edit `~/.openclaw/workspace/IDENTITY.md` or use the gateway config:

### Option A: Cloud Models (recommended)

```yaml
# In your OpenClaw gateway config
agents:
  defaults:
    imageGenerationModel:
      primary: openai/dall-e-3
    model:
      primary: ollama/kimi-k2.7-code:cloud
```

### Option B: Local Models (Ollama)

```bash
# Install Ollama first: https://ollama.ai
ollama pull llama3
```

Then set your model to `ollama/llama3` in the config.

---

## Step 3: Import Agent Templates (3 minutes)

Copy the agent templates into your workspace:

```bash
# From the buyer-pack directory
cp -r agent-templates/* ~/.openclaw/workspace/agents/
```

On Windows (PowerShell):

```powershell
Copy-Item -Path "agent-templates\*" -Destination "$env:USERPROFILE\.openclaw\workspace\agents\" -Recurse -Force
```

This gives you six agent directories:

```
workspace/agents/
├── executive-orchestrator/
├── sr-developer/
├── qa-security/
├── architecture/
├── chief-of-staff/
└── intelligence-scout/
```

---

## Step 4: Import Skill Templates (2 minutes)

```bash
cp -r skills-templates/* ~/.openclaw/workspace/skills/
```

On Windows (PowerShell):

```powershell
Copy-Item -Path "skills-templates\*" -Destination "$env:USERPROFILE\.openclaw\workspace\skills\" -Recurse -Force
```

---

## Step 5: Personalize Your Agents (3 minutes)

Open each agent's `SOUL.md` and `IDENTITY.md` and replace the placeholders:

- `[YOUR NAME]` → your actual name
- `[YOUR PROJECTS]` → your real projects
- `[YOUR TIMEZONE]` → your timezone (e.g., America/New_York)
- `[YOUR EMAIL]` → your contact email

Start with the **Executive Orchestrator** — that's your main agent, the one you'll talk to directly.

### Key Files to Personalize

| File | What to Change |
|------|----------------|
| `executive-orchestrator/SOUL.md` | Your name, how you want the agent to talk to you |
| `executive-orchestrator/IDENTITY.md` | Model preference, emoji, vibe |
| `executive-orchestrator/BEHAVIOR.md` | Communication style, delegation rules |
| All other agents | Same set — SOUL, IDENTITY, BEHAVIOR, PHRASES |

---

## Step 6: Connect a Channel (1 minute)

Connect Telegram (or another messaging platform) so you can chat with your agents:

### Telegram Setup

1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
2. Copy the bot token
3. Add it to your OpenClaw config:

```yaml
plugins:
  entries:
    telegram:
      config:
        botToken: "YOUR_BOT_TOKEN"
```

4. Restart OpenClaw:

```bash
openclaw gateway restart
```

5. Send a message to your bot on Telegram. You should get a response.

---

## Step 7: Set Up Cron Jobs (1 minute)

Open `cron-recipes.md` and copy the entries you want into your OpenClaw scheduler. Examples:

- **Morning briefing** — daily at 8 AM
- **Weekly model intelligence** — Sundays at 9 AM
- **Security heartbeat** — every 4 hours
- **Resource steward** — weekly on Sundays

---

## Verification Checklist

- [ ] `openclaw --version` returns a version number
- [ ] `~/.openclaw/workspace/agents/` contains 6 agent directories
- [ ] `~/.openclaw/workspace/skills/` contains 5 skill directories
- [ ] You can send a message to your bot and get a response
- [ ] Executive Orchestrator's SOUL.md has your name (not `[YOUR NAME]`)
- [ ] At least one cron job is configured

---

## Troubleshooting

### "openclaw: command not found"
Make sure npm global bin is on your PATH: `npm config get prefix`

### Agent not responding
Check the gateway status: `openclaw gateway status`

### Model errors
Verify your model config and API keys are set correctly.

### Telegram bot not responding
- Make sure the bot token is correct
- Check that the gateway is running: `openclaw gateway status`
- Look at logs: `openclaw gateway logs`

---

## Next Steps

- Fill out `onboarding-form.html` and send it to your setup specialist for a personalized tuning session
- Explore the bundled skills in `node_modules/openclaw/skills/` for additional capabilities
- Join the OpenClaw community Discord for tips and support
- Read the full docs at https://docs.openclaw.dev

---

*You're running. Welcome to OpenClaw.*