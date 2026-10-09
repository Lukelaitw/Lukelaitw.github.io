// Structural checks on the static export in out/. Run after `npm run build`.
// FORBIDDEN_TERMS="a,b" also fails the check if any term appears in out/ (case-insensitive).
// Pass forbidden terms only through the environment; never commit them.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const OUT_DIR = "out";
// Ids of the <section> elements the page must contain.
const REQUIRED_SECTIONS = ["news"];
const TEXT_EXTENSIONS = new Set([".html", ".txt", ".js", ".css", ".json", ".svg", ".xml"]);

const indexPath = join(OUT_DIR, "index.html");
if (!existsSync(indexPath)) {
  console.error(`✗ ${indexPath} not found; run \`npm run build\` first.`);
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");
const failures = [];
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));

const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
if (h1Count !== 1) failures.push(`expected exactly one <h1>, found ${h1Count}`);

for (const id of REQUIRED_SECTIONS) {
  if (!ids.has(id)) failures.push(`missing section #${id}`);
}

for (const [, target] of html.matchAll(/href="#([^"]*)"/g)) {
  if (!ids.has(target)) failures.push(`in-page link #${target} has no matching id`);
}

if (ids.has("publications") !== html.includes('href="#publications"')) {
  failures.push("the Publications section and its nav link must appear together");
}

for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
  if (!/\salt="[^"]+"/.test(tag)) failures.push(`<img> without alt text: ${tag.slice(0, 80)}`);
}

for (const [, url] of html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]*)/g)) {
  const file = join(OUT_DIR, decodeURIComponent(url), url.endsWith("/") ? "index.html" : "");
  if (!existsSync(file)) failures.push(`missing local file for ${url}`);
}

const visibleText = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, " ")
  .replace(/<[^>]+>/g, " ");
for (const suspicious of ["undefined", "[object Object]", "NaN"]) {
  if (visibleText.includes(suspicious)) failures.push(`page text contains "${suspicious}"`);
}

const terms = (process.env.FORBIDDEN_TERMS ?? "")
  .split(",")
  .map((term) => term.trim().toLowerCase())
  .filter(Boolean);
for (const file of terms.length > 0 ? walk(OUT_DIR) : []) {
  if (!TEXT_EXTENSIONS.has(extname(file))) continue;
  const content = readFileSync(file, "utf8").toLowerCase();
  // Report only the file, so the term itself never reaches logs.
  if (terms.some((term) => content.includes(term))) failures.push(`forbidden term found in ${file}`);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

if (failures.length > 0) {
  console.error(`✗ site check failed:\n${failures.map((failure) => `  - ${failure}`).join("\n")}`);
  process.exit(1);
}
console.log(`✓ site check passed${terms.length > 0 ? ` (scanned for ${terms.length} forbidden term(s))` : ""}`);
