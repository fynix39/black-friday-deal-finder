// DealHound — black-friday-deal-finder-01 entry (Node 22, standard library only).
//
// The site is plain static files in app/: index.html plus its stylesheet and
// ES modules (data.js holds the checked deals, filters.js the search/filter
// maths, views.js the card and detail rendering, main.js the wiring). No build
// step, no network loads — a browser opens app/index.html and everything it
// runs, styles or shows comes from app/ itself.
//
// This program hands the entry in. It copies app/ and screenshots/ from the
// repository into the output directory and writes dossier.json there with
// buildDossier from the vendored make.fun library (vendor/makefun-frontend.ts,
// copied from the kit unchanged — the scorer rebuilds the dossier with its own
// copy and requires the two to match byte for byte).
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(outputDir, "app"), { recursive: true });

const shotsDir = join(outputDir, "screenshots");
mkdirSync(shotsDir, { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), shotsDir, { recursive: true });
}

// Caps mirror the scorer's: at most 4 screenshots of 256 KiB each, app/ at
// most 993 files and 16 MiB, and the dossier text capped at 160 KiB.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, "dossier.json"), dossier);
