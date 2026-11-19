# Jasper Ng — AI Engineer

A separate React + TypeScript portfolio for Jasper. The current public portfolio repository [`Meowwwww111/jasper`](https://github.com/Meowwwww111/jasper) was read on 2026-11-20 for project, education, experience, skills, and contact details. That repository and the existing live site were not changed.

The visual direction follows the reference's large typographic hero, sparse navigation, compact About row, project storytelling, hobby section, “On the desk” list, year-linked career path, skills and contact. This page is independently implemented for Jasper: it does not use the reference's source code, personal content, or media. The project cards use original, locally bundled concept-motion videos and posters; they are labeled as illustrations, not recorded project footage. The desktop star field is a Three.js scene.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm ci --ignore-scripts
npm run dev
```

Open the local URL printed by Vite. For a production build, run `npm run build`; preview it with `npm run preview`.

## Motion, accessibility, and privacy

- A React Three Fiber star field appears on desktop. Small screens, reduced-motion preferences, and WebGL failures use a light CSS fallback.
- GSAP animates the hero intro, adds a subtle star-field parallax effect while scrolling, and reveals sections as they enter view. These effects are disabled when the system requests reduced motion.
- Each project preview has accessible play/pause, seek, and playback-speed controls. Muted previews only play while visible; reduced-motion mode leaves the poster still.
- Career years link directly to Jasper's source-based experience and education entries.
- Navigation is keyboard-operable, has a skip link and visible focus, and remains usable without the 3D scene.
- No server, analytics, database, external model, or visitor-data collection is included. The contact link opens an email draft.
- `package-lock.json` pins the complete resolved dependency graph. Installation used lifecycle scripts disabled. GSAP package metadata identifies its Standard “no charge” license; review its terms before paid client work.

## GitHub Pages note

The v4 implementation is published on [`codex/jasper-3d-portfolio-v4`](https://github.com/Meowwwww111/jasper_3d_portfolio/tree/codex/jasper-3d-portfolio-v4). The separate `codex/jasper-3d-portfolio` branch remains the repository default. No Pages deployment is configured. To publish later, set Vite's `base` to `/jasper_3d_portfolio/`, configure a Pages build from the repository, and select GitHub Actions as the Pages source. No deployment or Pages settings have been changed.
