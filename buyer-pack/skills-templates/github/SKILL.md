# SKILL.md — GitHub

## Purpose

Interact with GitHub repositories using the `gh` CLI tool. Manage issues, pull requests, CI/CD logs, releases, reviews, and API queries from within OpenClaw agent workflows.

## Scope

- Create, read, and manage GitHub issues
- Create and review pull requests
- Check CI/CD status and logs
- Manage releases and tags
- Query GitHub API for repository data
- Comment on issues and PRs
- Handle code reviews and review requests
- Repository cloning and branch management

## When to Use

- Checking PR status or review state
- Fetching CI logs for a failed build
- Creating issues from agent findings
- Managing releases and changelogs
- Reviewing code across repositories
- Querying repository metadata
- Automating GitHub workflows

## When NOT to Use

- General web tasks (use browser automation or web_fetch)
- Non-GitHub git operations (use standard git commands)
- Tasks that require GitHub web UI interaction (use browser automation)

## Source of Truth

This skill template lives in `workspace/skills/github/SKILL.md`.
The bundled `gh` CLI must be installed and authenticated (`gh auth login`).

## Prerequisites

- `gh` CLI installed: https://cli.github.com
- Authenticated: `gh auth login` completed
- Git configured with user name and email

## Key Commands

| Action | Command | Description |
|--------|---------|-------------|
| List issues | `gh issue list` | Open issues in current repo |
| Create issue | `gh issue create --title "..." --body "..."` | New issue |
| View issue | `gh issue view <number>` | Issue details |
| List PRs | `gh pr list` | Open pull requests |
| Create PR | `gh pr create --title "..." --body "..."` | New pull request |
| Check PR status | `gh pr checks <number>` | CI status for PR |
| View PR diff | `gh pr diff <number>` | Diff for a PR |
| Review PR | `gh pr review <number> --approve/--comment` | Submit a review |
| CI logs | `gh run list` / `gh run view <id> --log` | Workflow run logs |
| Create release | `gh release create <tag>` | New release |
| API query | `gh api /repos/<owner>/<repo>/...` | Direct API call |

## Workflow Patterns

### Check PR Status
```bash
gh pr checks <PR_NUMBER>            # See CI status
gh pr view <PR_NUMBER> --json state,reviewDecision  # Review state
```

### Create Issue from Agent Finding
```bash
gh issue create \
  --title "Bug: <description>" \
  --body "## Finding\n\n<details>\n\n## Repro\n\n<steps>" \
  --label "bug"
```

### Fetch Failed CI Logs
```bash
gh run list --status failure --limit 1
gh run view <RUN_ID> --log-failed
```

## Notes

- Always use `--json` flag for machine-readable output
- Set `GH_REPO` environment variable for cross-repo operations
- Use `gh api` for any operation not covered by built-in commands