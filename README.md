# demos.sanderdesnaijer.com

Small browser experiments and demos. No pipeline, no polish, just ideas running in a browser.

**[demos.sanderdesnaijer.com](https://demos.sanderdesnaijer.com)**

---

## What this is

A lightweight static site that collects browser-based experiments by [Sander de Snaijer](https://sanderdesnaijer.com). Each demo is a standalone HTML file or folder. Some are hosted here, some link out to their own sites.

No framework, no build step, no CMS. Just HTML, CSS and vanilla JavaScript deployed to GitHub Pages.

---

## Demos

### MediaPipe Rainbow Magic

Hand tracking and face detection running live in the browser. Draw rainbow trails with one finger, burst stars with a peace sign, open your mouth to trigger the MAGIC effect.

- **Demo:** [demos.sanderdesnaijer.com/demos/mediapipe-rainbow/](https://demos.sanderdesnaijer.com/demos/mediapipe-rainbow/)
- **Tutorial:** [sanderdesnaijer.com/blog/mediapipe-hand-face-tracking-browser](https://sanderdesnaijer.com/blog/mediapipe-hand-face-tracking-browser)
- **Stack:** MediaPipe Tasks Vision, HTML Canvas, Vanilla JavaScript

### Eyebrow Tetris

Face-controlled Tetris. Raise your eyebrows to rotate a piece, open your mouth to drop it.

- **Site:** [eyebrow-tetris.sanderdesnaijer.com](https://eyebrow-tetris.sanderdesnaijer.com)
- **Stack:** MediaPipe, WebGL, TypeScript

### Pug's Hunt

Duck Hunt with hand tracking. Your webcam hand replaces the lightgun.

- **Site:** [pugshunt.com](https://pugshunt.com)
- **Stack:** MediaPipe, Webcam, TypeScript

---

## Structure

```
/
├── index.html              # overview page
├── img/                    # shared images and og images
└── demos/
    └── mediapipe-rainbow/
        └── index.html      # standalone demo page
```

Each new demo gets its own folder under `demos/`. External projects (Eyebrow Tetris, Pug's Hunt) are listed on the overview but live at their own domains.

---

## Adding a demo

1. Create a folder under `demos/your-demo-name/`
2. Add an `index.html` with proper SEO tags (title, description, canonical, og:image)
3. Add a card to the root `index.html` with image, date, type badge, tags and links
4. If the demo has a tutorial on sanderdesnaijer.com, add the `read tutorial` link to both the card footer and a banner at the top of the demo page

---

## Deployment

Deployed to GitHub Pages from the `main` branch. No build step needed, push and it's live.

---

## Related

- [sanderdesnaijer.com](https://sanderdesnaijer.com) — main site with projects and blog
- [eyebrow-tetris.sanderdesnaijer.com](https://eyebrow-tetris.sanderdesnaijer.com)
- [pugshunt.com](https://pugshunt.com)
