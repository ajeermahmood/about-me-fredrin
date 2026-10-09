# About Me page: how work is done here

A one-page site about Ajeer Mohammed: who he is, what he has shipped, how to reach
him. Plain HTML and CSS in `site/`, checked by `scripts/check.ts`.

## Commands

- `npm run check` : the acceptance check. Offline, fast, must exit 0 before Review.
- `npm run check:links` : the same, plus every external link fetched over the network.
- `npm run serve` : serve `site/` locally on the worktree's port.

There is no build step and no dependencies. Do not add any.

## Rules

1. **Every claim comes from `content/facts.md`.** Every number on the page must appear
   there, and every external link must be copied from it exactly. The check enforces
   both. If the page needs a fact that is not in the file, park the ticket in Blocked
   and ask. Never invent, round up or "improve" a number.
2. **Use the words in `CONTEXT.md`.** Its "Avoid" list is enforced by the check.
3. **Static only.** `site/index.html` and `site/styles.css`. No JavaScript, no web
   fonts, no external requests at load. Total under 60 KB.
4. **Accessible by default.** One `h1`, headings in order, real links, colour contrast
   that passes, readable at 360px wide, a `lang` attribute and a meta description.
5. **Sections have fixed ids** so links and the check can find them: `#about`,
   `#shipped`, `#contact`. Add a section by adding its id to `REQUIRED_SECTIONS` in
   `scripts/check.ts` in the same change.
6. **Finish every ticket by running `npm run check`** and reporting its real exit code.

## Where to look

- Content and tone: `.fredrin/memory/concepts/page-content.md`
- What the check enforces and why: `.fredrin/memory/concepts/acceptance-checks.md`
- Settled decisions: `.fredrin/memory/adr/`
