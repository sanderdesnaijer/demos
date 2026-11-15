# Face Mesh Explorer tests

Browser tests for the demo. No webcam, no install, no build step.

## Run them

From the repository root:

```bash
python3 -m http.server 8111
```

Then open <http://localhost:8111/demos/face-mesh-explorer/tests/> and keep that
tab in the foreground. The suite runs on load; the button re-runs it.

Green means every assertion passed. A failure shows the expected and actual
value under the test name.

**Keep the tab visible.** Browsers throttle timers in background tabs, which
slows the animation loop down enough to trip the eight second timeouts.

## Check it by hand (with your webcam)

The automated suite uses fixtures, so it can never tell you whether the
landmarks actually sit on your face and hands. That part is manual:

Open <http://localhost:8111/demos/face-mesh-explorer/> and work down this list.

1. **Start camera.** Face mesh appears over your face, as before. Nothing about
   hands is visible yet.
2. **Hover your cheek.** Tooltip shows an index and a face region, the inspector
   fills in. This is the original behaviour, it must still feel the same.
3. **Tick "Show hand landmarks".** The sidebar says "Hand model ready" after a
   second or two, then raise a hand: a coloured skeleton tracks it, a different
   colour per finger.
4. **Raise both hands.** Two skeletons, tracked independently.
5. **Check the hand label.** Raise one hand, hover any of its points. The
   tooltip must name the hand you actually raised. If it says the opposite,
   flip `SWAP_HANDEDNESS` in the demo's script and flip `DISPLAY_HANDEDNESS`
   in `stub.mjs` to match.
6. **Take a hand out of frame.** Its skeleton disappears at once, no ghost left
   behind.
7. **Hover a fingertip.** Tooltip reads something like
   `#8 INDEX_FINGER_TIP - Right hand`, and the inspector shows the MediaPipe
   name with x/y/z.
8. **Click it.** Yellow ring, and it appears in Selected. Click a face point
   too, then Copy: the clipboard holds JSON with both.
9. **Tap a finger filter, say Thumb.** That finger stays bright, the rest of the
   skeleton dims but stays visible.
10. **Tick "Wireframe mode".** Camera and header disappear, leaving turquoise
    face mesh and the hand skeletons on black.
11. **Press Space** to freeze a pose. Hover and pin still work while frozen.
12. **Capture PNG.** Counts down 3, 2, 1, then downloads a 1200x630 file. Open
    it: no sidebar, no countdown, no yellow hover or pin markers.
13. **Tick "Include labels in capture", hover a fingertip and press C.** The
    countdown runs without the cursor moving, so the exported image shows that
    point ringed and labelled, for example `#8 INDEX_FINGER_TIP`. Pinned points
    are labelled too, so pin anything you want named.
14. **Open the palette button and change a hand colour.** The skeleton follows
    immediately, the finger filter buttons recolour, and the choice survives a
    reload. "Reset to defaults" restores both palettes.
15. **Tick "Download-themed overlay"** and capture again: two file cards appear
    in the exported image, bottom left.
16. **Untick "Show hand landmarks".** Everything hand-related disappears,
    including the finger filters. The demo is back to exactly what it was.

## What this covers

| Test | Guards against |
| --- | --- |
| default state unchanged | hand tracking leaking into the published demo's defaults |
| model loads on demand | downloading `hand_landmarker.task` for visitors who never ask for it |
| hand hover names the point | wrong index, wrong finger, wrong hand label |
| face hover unchanged | the shared hit test breaking the original behaviour |
| copy formats | the face-only output changing shape; hand pins losing which hand they came from |
| finger filter dims | filters hiding the skeleton instead of de-emphasising it |
| no stale skeletons | hands that left the frame staying on screen |
| capture export | wrong size, interface chrome in the image, broken countdown |
| labels in capture | the opt-in failing to put markers and labels in the export |
| capture with C | the shortcut losing the hover it was meant to preserve |
| themeable fingers | colour changes not reaching the renderer, or reset missing them |
| label draw order | the mesh or the other hand painting over a label |
| held hover | reaching for the Capture button dropping the point you lined up |
| real hand topology | the 21-connection graph changing in a MediaPipe upgrade |

The last test is the only one that touches the network; it skips itself if the
CDN is unreachable.

## How it works

`index.html` fetches the real demo page, swaps **only** the MediaPipe import for
`stub.mjs`, and runs it in an iframe with a grey canvas standing in for the
webcam. Everything else is the shipped code, so the tests exercise the real
rendering, interaction and export paths.

`stub.mjs` returns fixed landmark positions, so tests assert on exact
coordinates and names. `HandLandmarker.returnNoHands` makes both hands leave
the frame on demand.

The fetch is cache-busted on purpose. Without that the browser serves a stale
copy of the demo and every test passes against code you already changed.

## Adding a test

Append to the `tests` array in `index.html`:

```js
{
  name: 'what it should do',
  async fn(c) {
    await c.start();                       // boots the demo with the fake camera
    await c.setCheck('handsToggle', true); // flip any control by id
    await c.hover(HAND_POINTS[0][8]);      // hover a known landmark
    await c.clickCanvas();
    eq(c.$('infoIndex').textContent, '8', 'inspector index');
    return 'optional detail shown next to PASS';
  }
}
```

A test taking the `c` argument gets a fresh iframe; one taking none runs
standalone. Helpers on `c`: `$`, `all`, `waitFor`, `frames`, `start`,
`setCheck`, `hover`, `clickCanvas`, `sample`, `stub`, `imageFromBlob`, plus the
captured `blobs` and `clipboard` arrays.
