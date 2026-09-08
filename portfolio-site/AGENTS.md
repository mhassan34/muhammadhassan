# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Portfolio design decisions

- Use the selected light "Recruiter Dossier" direction: warm white, near-black type, lime accent, thin rules, square imagery, generous whitespace.
- Keep the information architecture simple and divided into clearly numbered sections with sticky navigation.
- The first three featured projects, in order, are UMG, DirectSplat, and Multiplayer; DirectSplat is the flagship.
- Project imagery should be polished, cohesive key art derived from Muhammad's real project screenshots rather than generic stock imagery.
- Recruiter conversion is the priority: email, LinkedIn, Behance, and downloadable CV must remain obvious and functional.
- Keep the portfolio data primarily on-site: show all ten relevant Behance projects with substantive responsibilities and technical details, then place the Behance portfolio CTA after those breakdowns.
- Expand Moshpit Studio and Skylla Studio experience while keeping the Fiverr entry concise.
- Do not show Education. Maintain six detailed Core Expertise areas instead.
