# Acceptance checks

`npm run check` runs `scripts/check.ts`, a TypeScript file Node runs directly with no
build step. It exits 0 when the page is acceptable and 1 otherwise, naming the file
and the problem for each failure. Content rules come from [page content](page-content.md).

## What it enforces, and why

| Check | Why |
|---|---|
| `site/index.html` exists with `lang`, a title, a meta description and a viewport | Basic, and easy for an agent to forget |
| Sections `#about`, `#shipped`, `#contact` exist | Links and later tickets depend on the ids |
| Exactly one `h1` | Accessibility and structure |
| Every number in the visible text appears in `content/facts.md` | An agent will happily write "10x faster". This makes an invented number fail |
| Every external link appears in `content/facts.md` exactly | Stops invented or mistyped URLs |
| No word from the Avoid list in `CONTEXT.md` | The glossary is enforced, not suggested |
| No `<script>`, no external stylesheet or font | The page must load with no outside requests |
| `index.html` plus `styles.css` under 60 KB | Keeps it fast on any connection |

`npm run check:links` adds a network fetch of every external link. LinkedIn and some
other sites refuse automated requests with 403 or 999; the check reports those as
"blocked by site", not as broken.

## Adding a rule

Add it to `scripts/check.ts` in the same pull request as the page change that needs
it, and add a row to the table above.
