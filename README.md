# demos.sanderdesnaijer.com

Small browser experiments and demos. No pipeline, no polish, just ideas running in a browser.

**[demos.sanderdesnaijer.com](https://demos.sanderdesnaijer.com)**

---

## What this is

A lightweight static site that collects browser-based experiments by [Sander de Snaijer](https://sanderdesnaijer.com). Each demo is a standalone HTML file or folder. Some are hosted here, some link out to their own sites.

No framework, no build step, no CMS. Just HTML, CSS and vanilla JavaScript deployed to GitHub Pages.

---

## Demos

### Face Mesh Landmark Explorer

Interactive reference for all 478 MediaPipe Face Mesh landmark indices. Hover over any point on your face to see its index, filter by region (eyes, mouth, nose, eyebrows, jaw, cheeks, forehead, iris), and copy coordinates to your clipboard. Built as a companion tool for the [Face Mesh Landmark Guide](https://sanderdesnaijer.com/blog/mediapipe-face-mesh-landmarks).

- **Demo:** [demos.sanderdesnaijer.com/demos/face-mesh-explorer/](https://demos.sanderdesnaijer.com/demos/face-mesh-explorer/)
- **Guide:** [sanderdesnaijer.com/blog/mediapipe-face-mesh-landmarks](https://sanderdesnaijer.com/blog/mediapipe-face-mesh-landmarks)
- **Stack:** MediaPipe FaceLandmarker, HTML Canvas, Vanilla JavaScript, Webcam

### Map Gesture Controls

Zoom and pan maps with hand gestures. Make a fist to pan, spread two open hands to zoom. Powered by MediaPipe hand tracking, runs entirely in the browser. No backend, no touch, no mouse.

- **Demo:** [demo-controls-overview.html](https://sanderdesnaijer.github.io/map-gesture-controls/demo/demo-controls-overview.html)
- **Project:** [sanderdesnaijer.com/projects/map-gesture-controls](https://sanderdesnaijer.com/projects/map-gesture-controls)
- **Tutorial:** [sanderdesnaijer.com/blog/gesture-controls-openlayers-mediapipe](https://sanderdesnaijer.com/blog/gesture-controls-openlayers-mediapipe)
- **Repo:** [github.com/sanderdesnaijer/map-gesture-controls](https://github.com/sanderdesnaijer/map-gesture-controls)
- **Stack:** MediaPipe, OpenLayers, WebGL, TypeScript, Webcam

### MediaPipe Rainbow Magic

Hand tracking and face detection running live in the browser. Draw rainbow trails with one finger, burst stars with a peace sign, open your mouth to trigger the MAGIC effect.

- **Demo:** [demos.sanderdesnaijer.com/demos/mediapipe-rainbow/](https://demos.sanderdesnaijer.com/demos/mediapipe-rainbow/)
- **Tutorial:** [sanderdesnaijer.com/blog/mediapipe-hand-face-tracking](https://sanderdesnaijer.com/blog/mediapipe-hand-face-tracking)
- **Stack:** MediaPipe Tasks Vision, HTML Canvas, Vanilla JavaScript

### Eyebrow Tetris

Face-controlled Tetris. Raise your eyebrows to rotate a piece, open your mouth to drop it.

- **Site:** [eyebrow-tetris.sanderdesnaijer.com](https://eyebrow-tetris.sanderdesnaijer.com)
- **Project:** [sanderdesnaijer.com/projects/eyebrow-tetris](https://sanderdesnaijer.com/projects/eyebrow-tetris)
- **Stack:** MediaPipe, WebGL, TypeScript

### Pug's Hunt

Duck Hunt with hand tracking. Your webcam hand replaces the lightgun.

- **Site:** [pugshunt.com](https://pugshunt.com)
- **Project:** [sanderdesnaijer.com/projects/pug-s-hunt-a-webcam-controlled-duck-hunt-built-with-hand-tracking](https://sanderdesnaijer.com/projects/pug-s-hunt-a-webcam-controlled-duck-hunt-built-with-hand-tracking)
- **Stack:** MediaPipe, Webcam, TypeScript

---

## Structure

```
/
├── index.html              # overview page
├── img/                    # shared images and og images
└── demos/
    ├── face-mesh-explorer/
    │   └── index.html      # interactive landmark explorer
    └── mediapipe-rainbow/
        └── index.html      # rainbow hand tracking demo
```

Each new demo gets its own folder under `demos/` when it is hosted here. External projects (Map Gesture Controls on GitHub Pages, Eyebrow Tetris, Pug's Hunt) are listed on the overview but live at their own URLs.

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

- [sanderdesnaijer.com](https://sanderdesnaijer.com) -- main site with projects and blog
- [Face Mesh Landmark Guide](https://sanderdesnaijer.com/blog/mediapipe-face-mesh-landmarks) -- companion blog post for the explorer
- [MediaPipe Hand & Face Tracking Tutorial](https://sanderdesnaijer.com/blog/mediapipe-hand-face-tracking) -- tutorial for the rainbow demo
- [Map Gesture Controls project](https://sanderdesnaijer.com/projects/map-gesture-controls) -- project write-up on sanderdesnaijer.com
- [Map Gesture Controls demo](https://sanderdesnaijer.github.io/map-gesture-controls/demo/demo-controls-overview.html) -- OpenLayers + MediaPipe (GitHub Pages)
- [Eyebrow Tetris project](https://sanderdesnaijer.com/projects/eyebrow-tetris) -- project write-up on sanderdesnaijer.com
- [eyebrow-tetris.sanderdesnaijer.com](https://eyebrow-tetris.sanderdesnaijer.com)
- [Pug's Hunt project](https://sanderdesnaijer.com/projects/pug-s-hunt-a-webcam-controlled-duck-hunt-built-with-hand-tracking) -- project write-up on sanderdesnaijer.com
- [pugshunt.com](https://pugshunt.com)

---
