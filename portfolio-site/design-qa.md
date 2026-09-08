# Design QA

final result: passed

## Comparison target

- Source visual truth: `qa/source-option-2.png`
- Rendered implementation: `qa/implementation-desktop-v3.png`
- Full-view comparison evidence: `qa/comparison-final.png`
- Focused project-region evidence: `qa/comparison-project-focus.png`
- Expanded project evidence: `qa/implementation-project-archive.png`
- Expanded experience evidence: `qa/implementation-experience.png`
- Expanded expertise evidence: `qa/implementation-expertise.png`
- Responsive evidence: `qa/implementation-mobile.png`
- State: home page, Splat selected, default pointer state, expanded on-site content requested after the original visual selection
- Desktop viewport: 1440 × 1024 CSS px, `deviceScaleFactor: 1`
- Source pixels: 1440 × 1024; implementation pixels: 1440 × 1024
- Density normalization: none required; source and implementation are both 1× at identical dimensions
- Mobile viewport: 390 × 844 CSS px, `deviceScaleFactor: 1`; full-page capture is 390 × 5429 px

## Findings

- No actionable P0, P1, or P2 differences remain. The editorial shell still follows the source; the longer project, experience, and expertise sections are an intentional user-requested content expansion below the flagship showcase.
- [P3] The implemented Splat overlay contains more explanatory copy and a stronger CTA than the visual target. This is an intentional recruiter-focused content enhancement; the image hierarchy, three-item tab rail, square-edged panel, and section rhythm remain faithful.

## Required fidelity surfaces

- Fonts and typography: Archivo provides the heavy condensed-feeling display hierarchy while IBM Plex Mono handles navigation, indexes, metadata, and proof points. Weights, uppercase treatment, line height, letter spacing, and wraps match the selected editorial direction at desktop and remain legible on mobile.
- Spacing and layout rhythm: header, three-column hero, numbered section label, left project rail, and image panel align with the source at the same viewport. The detailed two-column project grid extends the Projects section by explicit request while preserving square edges, thin rules, generous spacing, and clear section boundaries.
- Colors and visual tokens: warm paper, near-black ink, muted gray, thin neutral rules, and acid-lime interaction accents map directly to the source. The final capture uses the default lime CV state rather than a hover state.
- Image quality and asset fidelity: all three featured projects use 1600 × 900 generated raster artwork sized and cropped for the project slot. No placeholder, CSS art, emoji, or handcrafted SVG imagery is used. The Splat image preserves the interior-to-point-cloud concept while increasing cinematic contrast.
- Copy and content: name, role, experience, technical focus, email, LinkedIn, Behance, and CV content are grounded in Muhammad Hassan's supplied CV, Behance project modules, Moshpit, and Invasion. Ten projects now have on-site summaries and technical breakdowns; Moshpit and Skylla are expanded; Fiverr remains concise; Education was removed by request. The top order remains UMG, Splat, Multiplayer, with Splat selected by default.
- Icons and affordances: Phosphor icons are used consistently for external links, contact actions, project arrows, mobile navigation, and CV download. Tabs expose selected state and all primary controls have visible focus treatment.
- Responsiveness and accessibility: the mobile page has no horizontal overflow at 390 px; the navigation opens and closes; semantic tabs, headings, labels, alt text, skip link, and focus-visible styles are present.

## Comparison history

1. Initial browser capture found a P2 mobile overflow caused by the hero wordmark and timing-sensitive route assertions. Reduced the mobile display type scale, added route visibility waits, and confirmed `scrollWidth: 390` at a 390 px viewport.
2. First combined comparison found P2 above-the-fold drift: the CV button was captured in hover state, the project panel inherited the image's natural height, and the Behance archive delayed the Experience section. Cleared the pointer before capture, constrained the desktop panel to 405 px, and moved the archive after Experience and expertise.
3. Final full-view and focused comparisons show the source and implementation at matching viewport, density, selected tab, section order, and vertical rhythm. No actionable P0/P1/P2 findings remain.
4. Follow-up content pass added ten detailed project cards, authentic Behance cover imagery for the remaining work, expanded Moshpit/Skylla and six expertise areas, removed Education, and kept a single Behance CTA after the on-site project information. Desktop section captures and a 390 px full-page capture show no clipping or overflow.

## Browser verification

- UMG, Splat, and Multiplayer tab interactions: passed
- DirectSplat case-study route and return path: passed
- Downloadable CV request: 200
- Mobile navigation open/close: passed
- Mobile horizontal overflow: none
- Ten detailed project cards: passed
- Expanded Moshpit details and concise Fiverr entry: passed
- Six expanded expertise areas: passed
- Education removed: passed
- Behance CTA follows on-site project details: passed
- Browser console and page errors: none
- Site-template checks: passed

## Follow-up polish

- Optional P3: shorten the Splat overlay paragraph by one line if an even quieter hero-project panel is preferred later.
