# About Me

A one-page site about Ajeer Mohammed, built with [Fredrin](https://www.fredrin.com).

The repository was made agent-ready before any page existed: a glossary in
`CONTEXT.md`, conventions in `AGENTS.md`, concept docs and decision records in
`.fredrin/memory/`, a single facts file in `content/facts.md`, and an acceptance
check in `scripts/check.ts` that fails on any number, link or word the facts and
glossary do not allow. The page itself was then built by a Fredrin Worker from a
ticket.

```bash
npm run check         # offline acceptance check, must exit 0
npm run check:links   # the same, plus every external link fetched
```
