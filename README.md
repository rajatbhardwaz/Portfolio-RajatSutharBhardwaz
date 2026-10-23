# Rajat Suthar Bhardwaz — Portfolio

> **Software Engineer × Designer**  
> Crafting considered digital product systems, resilient front-ends, and clear interactive experiences.

---

## ✦ Overview

This is an independent personal portfolio built with vanilla web technologies, optimized for performance, accessibility, and high visual impact. It features an editorial, neo-brutalist design with custom interactive micro-interactions, responsive fluid typography, and zero third-party framework dependencies.

### Key Sections:
- **01 / Hero**: Dynamic perspective tilt device with interactive 5-stage thinking orbit.
- **02 / Approach**: Five-pillar process system (*Understand, Explore, Design, Build, Refine*).
- **03 / Selected Practice**: Interactive discipline cards with custom geometric vector compositions and detailed practice modal inspection.
- **04 / The Case-Study Lens**: Sticky editorial reasoning framework for digital product case studies.
- **05 / The Playground**: Interactive 4-discipline board exploring interfaces, visual systems, 3D/CAD volume reasoning, and creative experiments.
- **06 / About**: Perspective overview connecting human attention with resilient systems.
- **07 / Contact & Footer**: Direct email, WhatsApp, and call actions with responsive top controls.

---

## 🛠 Tech Stack

- **Markup**: Semantic HTML5 (accessible ARIA dialogs, landmarks, roles, and tabs)
- **Styling**: Vanilla CSS (CSS Grid, Flexbox, custom properties, clamp-based fluid type, and `prefers-reduced-motion` compliance)
- **Scripting**: Vanilla JavaScript (ES modules, IntersectionObserver scroll reveals, keyboard-accessible tabs, modal dialog state management)
- **Asset Optimization**: Crisp vector SVG favicon and lightweight CSS-driven artwork

---

## 🚀 Local Development

To run and preview the site locally:

### Option 1: Using Python
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Using Node
```bash
npx serve .
```

---

## 🧪 Validation & Source Checks

Before committing or pushing changes, run the built-in integrity check:

```bash
npm run check
# or
npm run build
```

This verifies:
- Required files and markup landmarks exist.
- Internal hash links are valid and target existing IDs.
- Safe external link attributes (`noopener noreferrer`) are present.
- Accessible fallbacks (`prefers-reduced-motion`, `IntersectionObserver`) are wired up.
- Mirrors assets to `dist/` for versatile deployment environments.

---

## 🌐 Vercel Deployment

This repository is configured for zero-error deployments on [Vercel](https://vercel.com):

1. **Automatic Root Serving**: Configured via `vercel.json` to deploy static files cleanly without missing directory errors.
2. **Dual Compatibility**: Assets are served from root `.` while also mirrored to `dist/` during `npm run build`, ensuring full compatibility regardless of your Vercel project preset.
3. **Clean URLs & Favicon**: Built-in SVG and ICO assets eliminate `404` errors in server logs.

### Deploy Steps:
1. Push your changes to GitHub on the `main` branch:
   ```bash
   git add .
   git commit -m "feat: portfolio UI refinements and Vercel configuration"
   git push origin main
   ```
2. In Vercel, connect this repository.
3. Vercel will automatically detect the static project and deploy it instantly.
