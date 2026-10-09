/**
 * Acceptance check for the About Me page.
 *
 * Runs directly on Node 23.6 or newer, which strips TypeScript types itself, so there
 * is no build step and no dependency: `node scripts/check.ts`.
 *
 * Exit 0: the page is acceptable. Exit 1: at least one failure, each printed with
 * what is wrong. Add `--network` to also fetch every external link.
 *
 * The rules and their reasons are in .fredrin/memory/concepts/acceptance-checks.md.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const PAGE = join(ROOT, "site", "index.html");
const STYLES = join(ROOT, "site", "styles.css");
const FACTS = join(ROOT, "content", "facts.md");
const CONTEXT = join(ROOT, "CONTEXT.md");

/** Section ids the page must have. Add an id here in the same change that adds the section. */
const REQUIRED_SECTIONS = ["about", "shipped", "contact"];
const SIZE_LIMIT_BYTES = 60 * 1024;
const NETWORK = process.argv.includes("--network");

const failures: string[] = [];
const notes: string[] = [];
const fail = (message: string) => failures.push(message);

function read(path: string): string {
  return readFileSync(path, "utf8");
}

/** The text a reader sees: no tags, no scripts or styles, common entities decoded. */
function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");
}

/** Numbers as written: 1,276 and 60 and 9 are tokens; a percent sign stays attached. */
function numbersIn(text: string): Set<string> {
  return new Set(text.match(/\d[\d,]*(?:\.\d+)?%?/g)?.map((n) => n.replace(/,$/, "")) ?? []);
}

/** The words under the "## Avoid" heading of CONTEXT.md, one per "- " line. */
function avoidList(context: string): string[] {
  const section = context.split(/^## Avoid\s*$/m)[1] ?? "";
  return section
    .split(/^## /m)[0]
    .split("\n")
    .map((line) => line.match(/^\s*-\s+(.+?)\s*$/)?.[1])
    .filter((word): word is string => Boolean(word));
}

if (!existsSync(PAGE)) {
  console.error("FAIL  site/index.html does not exist yet.");
  process.exit(1);
}

const html = read(PAGE);
const facts = read(FACTS);
const text = visibleText(html);

// Basics an agent tends to forget.
if (!/<html[^>]*\blang="[a-z-]+"/i.test(html)) fail('<html> has no lang attribute, e.g. lang="en".');
if (!/<title>[^<]{3,}<\/title>/i.test(html)) fail("The page has no <title>.");
if (!/<meta[^>]+name="description"[^>]+content="[^"]{20,}"/i.test(html)) {
  fail("No meta description of at least 20 characters.");
}
if (!/<meta[^>]+name="viewport"/i.test(html)) fail("No viewport meta tag, so phones will zoom out.");

// Structure.
for (const id of REQUIRED_SECTIONS) {
  if (!new RegExp(`\\bid="${id}"`).test(html)) fail(`Missing the #${id} section.`);
}
const h1s = html.match(/<h1[\s>]/gi)?.length ?? 0;
if (h1s !== 1) fail(`Expected exactly one <h1>, found ${h1s}.`);

// Every anchor link points at an id that exists.
for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!new RegExp(`\\bid="${target}"`).test(html)) fail(`Link to #${target} has no matching id.`);
}

// No invented numbers.
const known = numbersIn(facts);
for (const n of numbersIn(text)) {
  if (!known.has(n)) fail(`The number "${n}" is on the page but not in content/facts.md.`);
}

// No invented links.
for (const [, url] of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
  if (!facts.includes(url)) fail(`The link ${url} is not in content/facts.md.`);
}
for (const [, address] of html.matchAll(/href="mailto:([^"?]+)/g)) {
  if (!facts.includes(address)) fail(`The email ${address} is not in content/facts.md.`);
}

// The glossary's Avoid list, enforced.
for (const word of avoidList(read(CONTEXT))) {
  if (new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text)) {
    fail(`The page uses "${word}", which CONTEXT.md says to avoid.`);
  }
}

// Static, self-contained, small.
if (/<script/i.test(html)) fail("The page contains a <script>. It must be static.");
if (/<link[^>]+href="https?:/i.test(html) || /fonts\.googleapis/i.test(html)) {
  fail("The page loads an external stylesheet or font.");
}
const size = statSync(PAGE).size + (existsSync(STYLES) ? statSync(STYLES).size : 0);
if (size > SIZE_LIMIT_BYTES) fail(`index.html plus styles.css is ${size} bytes, over ${SIZE_LIMIT_BYTES}.`);
if (existsSync(STYLES) && /@import\s+url\(\s*["']?https?:/i.test(read(STYLES))) {
  fail("styles.css imports something from the network.");
}

// Optional: are the links actually alive?
if (NETWORK) {
  const urls = [...new Set([...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]))];
  await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15_000) });
        if (res.status === 403 || res.status === 999) notes.push(`blocked by site (${res.status}): ${url}`);
        else if (res.status >= 400) fail(`Broken link (${res.status}): ${url}`);
      } catch {
        fail(`Could not reach ${url}`);
      }
    }),
  );
}

for (const note of notes) console.log(`note  ${note}`);
if (failures.length) {
  for (const f of failures) console.error(`FAIL  ${f}`);
  console.error(`\n${failures.length} problem${failures.length === 1 ? "" : "s"}. Fix them before Review.`);
  process.exit(1);
}
console.log(`ok    page passes every check${NETWORK ? ", links included" : ""}.`);
