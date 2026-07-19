# SKILL.md — Security Review

## Purpose

Audit authentication, authorization, public endpoints, secrets management, file uploads, and overall security posture for web applications and infrastructure managed through OpenClaw.

## Scope

- Authentication and session management review
- Authorization and access control audit
- Public endpoint exposure assessment
- Secrets and API key management review
- File upload security validation
- Dependency vulnerability scanning
- CORS and headers configuration check
- Rate limiting and abuse prevention review
- Infrastructure exposure assessment (ports, firewall, SSH)

## When to Use

- Before deploying a new application to production
- After significant changes to auth or access control
- When setting up new endpoints or APIs
- When reviewing third-party integrations
- Periodic security audits (weekly/monthly)
- After discovering a potential vulnerability
- When adding file upload functionality
- When configuring CORS or security headers

## When NOT to Use

- General code review (use code review practices instead)
- Performance optimization (use a performance review skill)
- Feature testing (use QA/testing skills)
- Routine development tasks

## Source of Truth

This skill template lives in `workspace/skills/security-review/SKILL.md`.

## Security Audit Checklist

### Authentication
- [ ] Password requirements meet standards
- [ ] Session tokens are properly expired
- [ ] Multi-factor authentication available
- [ ] Login rate limiting in place
- [ ] Password reset flow is secure

### Authorization
- [ ] Role-based access control implemented
- [ ] API endpoints check permissions
- [ ] No IDOR (Insecure Direct Object Reference) vulnerabilities
- [ ] Admin routes are protected
- [ ] User data is isolated by tenant

### Secrets Management
- [ ] No secrets in source code
- [ ] No secrets in environment variables exposed to client
- [ ] API keys stored in secrets manager
- [ ] .env files in .gitignore
- [ ] No secrets in logs or error messages

### Public Endpoints
- [ ] No debug endpoints exposed
- [ ] No internal APIs publicly accessible
- [ ] Health check endpoints don't leak info
- [ ] Error messages don't expose stack traces
- [ ] No directory listing enabled

### File Uploads
- [ ] File type validation (MIME + extension)
- [ ] File size limits enforced
- [ ] Uploads stored outside web root
- [ ] Filename sanitization
- [ ] No executable upload allowed

### Infrastructure
- [ ] Firewall configured (only needed ports open)
- [ ] SSH key-only auth (no passwords)
- [ ] Regular security updates applied
- [ ] HTTPS enforced with valid certificates
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)

### Dependencies
- [ ] No known critical vulnerabilities
- [ ] Dependencies regularly updated
- [ ] Lock files in place
- [ ] No unused dependencies

## Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| 🔴 Critical | Exploitable, data breach risk | Fix immediately |
| 🟠 High | Likely exploitable, significant impact | Fix within 24 hours |
| 🟡 Medium | Potential risk, should be addressed | Fix within a week |
| 🟢 Low | Minor risk, best practice | Fix when convenient |
| ℹ️ Info | Informational, no direct risk | Document and monitor |

## Output Format

```
## Security Review — [Date]

### Summary
- Critical: N
- High: N
- Medium: N
- Low: N

### Findings

#### [Severity] Finding Title
- **Location:** file/path or endpoint
- **Description:** What's wrong
- **Risk:** What could happen
- **Recommendation:** How to fix
- **Status:** Open / Fixed / Accepted Risk
```

## Rules

1. **Never expose secrets** in reports or logs
2. **Never attempt actual exploitation** — identify risk, don't exploit it
3. **Report findings with evidence** — show the config, code, or endpoint
4. **Prioritize by risk** — critical first, info last
5. **The user approves all remediation** — recommend, don't auto-fix