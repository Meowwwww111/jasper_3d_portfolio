# Jasper Ng — AI Engineer

A separate React + TypeScript portfolio for Jasper. The current public portfolio repository [`Meowwwww111/jasper`](https://github.com/Meowwwww111/jasper) was read on 2026-11-20 for project, education, experience, skills, and contact details. That repository and the existing live site were not changed.

The visual direction follows the reference's large typographic hero, sparse navigation, compact About row, project storytelling, hobby section, “On the desk” list, year-linked career path, skills and contact. This page is independently implemented for Jasper: it does not use the reference's source code, personal content, or media. Project artwork and the desktop star field are original CSS/Three.js elements.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm ci --ignore-scripts
npm run dev
```

Open the local URL printed by Vite. For a production build, run `npm run build`; preview it with `npm run preview`.

## Motion, accessibility, and privacy

- A React Three Fiber star field appears on desktop. Small screens, reduced-motion preferences, and WebGL failures use a light CSS fallback.
- GSAP ScrollTrigger reveals are disabled when the system requests reduced motion.
- Career years link directly to Jasper's source-based experience and education entries.
- Navigation is keyboard-operable, has a skip link and visible focus, and remains usable without the 3D scene.
- No server, analytics, database, external model, or visitor-data collection is included. The contact link opens an email draft.
- `package-lock.json` pins the complete resolved dependency graph. Installation used lifecycle scripts disabled. GSAP package metadata identifies its Standard “no charge” license; review its terms before paid client work.

## GitHub Pages note

The local v4 visual revision is not yet pushed. The remote `codex/jasper-3d-portfolio` branch still contains the earlier implementation and is currently reported by GitHub as the repository default branch; no Pages deployment is configured. To publish a later approved build, set Vite's `base` to `/jasper_3d_portfolio/`, configure a Pages build from the repository, and select GitHub Actions as the Pages source. No deployment or Pages settings have been changed.
