import { readFile, stat, mkdir, copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const requiredFiles = ["index.html", "styles.css", "script.js"];

for (const file of requiredFiles) {
  await stat(resolve(file));
}

const [html, css, js] = await Promise.all(
  requiredFiles.map((file) => readFile(resolve(file), "utf8"))
);

const requiredMarkup = ["<main", "id=\"approach\"", "id=\"work\"", "id=\"playground\"", "id=\"about\"", "id=\"contact\""];
for (const marker of requiredMarkup) {
  if (!html.includes(marker)) throw new Error(`Missing required markup: ${marker}`);
}

if (!css.includes("prefers-reduced-motion")) throw new Error("Reduced-motion styles are required.");
if (!js.includes("IntersectionObserver")) throw new Error("Scroll reveal fallback is required.");

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
const hashLinks = [...html.matchAll(/\shref="#([^"]+)"/g)].map((match) => match[1]);
for (const target of hashLinks) {
  if (!ids.has(target)) throw new Error(`Broken in-page link: #${target}`);
}

if (!ids.has("home") || ids.has("top")) throw new Error("Top controls must target the flow-based #home section.");
if (!html.includes("data-scroll-top") || !js.includes("window.scrollTo")) throw new Error("Functional top controls are required.");
if (!js.includes("CONTACT_DETAILS") || !html.includes("footer-contact-list")) throw new Error("Footer contact configuration is required.");
if (!js.includes("noopener noreferrer")) throw new Error("External contact links need safe rel attributes.");

// Mirror static files to public/ and dist/ for complete Vercel and hosting compatibility
try {
  const targetDirs = ["public", "dist"];
  const filesToDist = ["index.html", "styles.css", "script.js", "favicon.svg", "favicon.ico"];
  for (const dir of targetDirs) {
    await mkdir(resolve(dir), { recursive: true });
    for (const f of filesToDist) {
      try {
        await copyFile(resolve(f), resolve(dir, f));
      } catch {
        // Optional file skipped if absent
      }
    }
  }
} catch (distErr) {
  console.warn("Build sync notice:", distErr.message);
}

console.log("Portfolio source checks passed.");
