# Facts

The only source of truth for what the page says about me. Every claim, number
and link on the page must come from this file. If something is not here, it does
not go on the page. Ask instead of guessing.

## Who

- Name: Ajeer Mohammed
- Role: Senior full-stack engineer
- Based in: India, working remotely (IST, UTC+5:30)
- In one line: I ship production software with AI coding agents, and build the
  checks that keep their mistakes out of production.
- Since July 2026, about nine in ten of my commits are written with a coding agent,
  mostly Claude Code.
- Before that: nearly two and a half years with teams in Dubai, building apps and
  live-event installations for brands like Nestle, L'Oreal and Abbott.

## Shipped

### Enrixa Store, a multi-tenant e-commerce platform
- Every merchant runs an isolated store on its own subdomain, on one shared
  database.
- NestJS, Prisma and PostgreSQL, with two Next.js apps.
- 60 data models and 287 REST endpoints.
- Built mostly with Claude Code: 1,276 of my 1,357 commits were written with the agent.
- Every push runs a tenant-isolation check and a migration check, so a query that
  could show one merchant's data to another fails the build.

### An agent that works production support tickets
- Merchants file storefront tickets. On a schedule, the agent reads new and
  reopened tickets, reproduces each one at the merchant's screen size, fixes it,
  passes the test gate and a code review, deploys, checks the live site, and
  closes the ticket with a plain-language note.
- In its first six weeks, one in three of its fixes came back reopened, almost all
  reasoned from code and never observed in a browser. Observed evidence is now a
  condition of closing.

### Making repositories safe for coding agents
- Agent instructions in 8 production repositories.
- Cut an agent's permission list from 662 rules to 62, with explicit deny rules.
- A hook that blocks the agent from reading secret files.
- An incident: a hook used a repo-relative path, so a subagent running from a
  subdirectory could not find it. A failing pre-tool hook blocks every tool call
  instead of failing open, so the session stalled. Recovered with throwaway git
  worktrees; fixed by resolving every hook from the project root.

### Enrixa AI, a shopping assistant for Shopify
- Live for a real online pharmacy.
- Looks up products, variants and stock while it answers, and falls back across
  Claude and Gemini when a provider is busy.
- 132 behaviour tests run the real assistant against a demo store, including the
  refusals a pharmacy must make.

### W.I.N.S, for the Alabama Department of Public Health
- A Next.js admin on Supabase and a Flutter app for parents, sharing one Postgres
  database of 15 tables.
- Wrote the schema contract and table ownership rules that let two teams change the
  same database without breaking each other.
- Live on the App Store and Google Play since July 2026.

### Live events, on site
- A body-tracking growth wall for Nestle's Ascenda launch at the Ritz-Carlton,
  Jeddah, used by more than 150 guests in one evening.
- An event app for L'Oreal used at more than 5 live events.

## Open source

- bouncer-gates: checks that stop expensive mistakes before they merge, as a CLI,
  a GitHub Action, an MCP server and an editor hook. Listed in the official MCP
  Registry. 159 tests.
  - https://github.com/ajeermahmood/bouncer-gates
- agent-ready-repo: a template for a repository coding agents can work in safely.
  - https://github.com/ajeermahmood/agent-ready-repo
- estate: one Go binary that checks a whole folder of repositories and fails CI.
  - https://github.com/ajeermahmood/estate

## Writing

- How I build software with AI agents: https://ajeer.website/how-i-work
- What my coding agents got wrong, and what caught it:
  https://ajeer.website/blog/what-my-coding-agents-got-wrong

## Contact

- Email: ajeermahmood@outlook.com
- GitHub: https://github.com/ajeermahmood
- LinkedIn: https://linkedin.com/in/ajeermahmood
- Website: https://ajeer.website
