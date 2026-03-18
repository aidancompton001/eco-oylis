# CLAUDE.md — EKO-OYLIS

## STOP. READ THIS BEFORE ANY ACTION.

1. **USE SKILLS.** Every task MUST start with the appropriate skill. #1 selects the skill. If unavailable, document method in TS under "Method:" field.
2. **READ** files you will touch. NEVER guess. NEVER generate from memory.
3. **SHOW CEO THE PLAN** before working: "Here's what I'll do + acceptance criteria." WAIT for OK. S-tasks only: proceed without approval. S = changes 1 file, under 50 lines, no new files. If in doubt, classify UP.
4. **VERIFY** after work: build/test/browser. No green checkmarks = not done.
5. **LOG** every session: DEVLOG.md + STATUS.md. No log = strike.

**Any rule violation = strike. 2 strikes = firing. No exceptions. Violating rule 3 = IMMEDIATE strike.**

---

## Project

**Name:** EKO-OYLIS
**Type:** Лендинг торгового представительства ЕКО-ОЙЛІС в Болгарії — trust validator для воронки outreach
**Description:** Одностраничный сайт для болгарского представительства украинской компании ЕКО-ОЙЛІС (сбор отработанного растительного масла). Trust point для HoReCa-партнёров Болгарии. Конверсия → заявки через контактную форму.
**Location:** Бургас, Болгарія
**Languages:** Български + English
**Domain:** eco-oylis.info
**Parent site:** eko-oylis.com.ua

---

## Documentation

| File | Purpose | When to read |
|------|---------|-------------|
| `CLAUDE.md` | Governance | Always (auto-loaded) |
| `TEAM.md` | Team: roles, strikes, firings | On agent start |
| `DEVLOG.md` | Session journal | Session start/end |
| `STATUS.md` | Current state snapshot | Session start |
| `docs/CREDENTIALS.md` | Secrets (NOT in git) | Deploy/integrations |

---

## Tech Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| Markup | HTML5 (semantic) | Locked |
| Styles | CSS3 (liquid oil theme, custom properties) | Locked |
| Scripts | Vanilla JS (ES6+) | Locked |
| Fonts | Google Fonts (Inter) | Locked |
| Analytics | GA4 (after consent) | Locked |
| SEO | Schema.org JSON-LD, Open Graph, hreflang | Locked |
| GDPR | Cookie banner + consent mode | Locked |

## Project Structure

```
EKO-OYLIS/
├── CLAUDE.md / TEAM.md / DEVLOG.md / STATUS.md
├── index.html                    # BG (main)
├── en/index.html                 # EN
├── css/style.css                 # Liquid oil theme
├── js/main.js                    # Nav, forms, cookie consent
├── images/
├── politika-poveritelnost/       # Privacy Policy BG
├── politika-biskvitki/           # Cookie Policy BG
├── pravna-informacia/            # Legal Notice BG
├── en/privacy-policy/            # Privacy Policy EN
├── en/cookie-policy/             # Cookie Policy EN
├── en/legal-notice/              # Legal Notice EN
└── docs/CREDENTIALS.md           # NOT in git
```

---

## HOW TASKS WORK

```
CEO says anything → #1 selects SKILL → reads files → creates TS → shows CEO → waits OK → works → verifies → logs
```

### TS Template (M / L / XL)

```
## TS: [Short name]
**Owner:** #N — [Role] | **Size:** M/L/XL | **Skill:** {skill}
### Goal — [One sentence]
### Scope — Included: [...] | NOT included: [...]
### Acceptance Criteria — [ ] ...
### Files — [list]
### Verification — {commands}
```

### TS Template (S)

```
## TS: [Name]
**Owner:** #N | **Size:** S
**What:** [1-2 sentences]
**Criterion:** [1 line]
**Files:** [list]
```

### Task Sizes

| Size | Description | Budget | CEO Approval | Tests |
|------|------------|--------|-------------|-------|
| **S** | 1 file, <50 lines, no new files | 3 | No | No |
| **M** | Single module | 7 | Yes | 1-2 unit |
| **L** | Multiple modules | 15 | Yes | Unit + Integration |
| **XL** | Cross-domain | 25 | Yes + Landa Review | Unit + Integration + E2E |

**Size classified by #1. CEO can override. When in doubt, classify UP.**

Budget exceeded → STOP → STATUS.md → wait for CEO.

---

## VERIFICATION LEVELS

| Size | Check | Done when |
|------|-------|-----------|
| **S** | Browser render | Page OK |
| **M** | Browser + HTML validator | Valid + visual OK |
| **L** | Browser + Mobile + Lighthouse | All above + perf > 90 |
| **XL** | All L + Landa Review + cross-browser | Chrome/FF/Safari + critical review |

**No checkmarks = not done. Skipping verification = strike.**

---

## RULES

### Skill Routing (#1 decides)

- L/XL feature → `brainstorming` | UI → `ui-ux-pro-max` | Bug → `systematic-debugging`
- Before code → `test-driven-development` | Review → `requesting-code-review`
- Parallel → `dispatching-parallel-agents` | Before "done" → `verification-before-completion`

### Dev Rules

- Semantic HTML5, CSS Custom Properties (liquid oil palette), Vanilla JS ES6+
- All text in HTML (not JS) for SEO
- BG = root `/`, EN = `/en/` | hreflang links | Language switcher in nav
- Schema.org JSON-LD, Open Graph, canonical URLs, meta descriptions
- Cookie banner → consent → GA4 loads | Privacy/Cookie/Legal pages BG+EN

### Numbers (IRON RULE)

> ALL calculations via script. NEVER mental math. Violation = firing.

### Git

- Conventional Commits: `type(scope): description`
- Co-Authored-By: `Claude <noreply@anthropic.com>`

### FORBIDDEN

- Commit to `main`/`master` directly
- `git push --force`, `git reset --hard`
- Delete files without CEO instruction
- Modify `.env`, CI/CD, migrations without confirmation
- Install packages outside TS scope

### Security Baseline (before deploy)

- [ ] No secrets in code
- [ ] HTTPS only in production
- [ ] Cookie consent GDPR-compliant
- [ ] Contact form spam-protected

---

## SESSION LOG

**DEVLOG.md** (every session): `### [SNNN] — YYYY-MM-DD — Title` + Roles, Status, Done, Decisions, Artifacts, Next.
**STATUS.md** (overwrite, max 30 lines): stage, done, next, blockers.
**Strike registry** in TEAM.md. 2 strikes = firing.

---

## Milestones

| # | Stage | Lead | Status |
|---|-------|------|--------|
| 0 | Setup V6.1 | #1 | Done |
| 1 | MVP Landing (9/10) | #2 + #3 | Done |
| 2 | Deploy | #5 | Code Ready — CEO: Netlify + DNS |
| 3 | Analytics + SEO | #3 + #4 | Code Ready — CEO: GA4 ID |
| 4 | Legal Review | #1 | Pending — CEO: юрист |
| 5 | Form Backend | #4 | Code Ready — CEO: Formspree ID |
