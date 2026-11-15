// Test doubles for @mediapipe/tasks-vision.
//
// The real models need a webcam and a real face, which makes them useless for
// automated checks. These fakes keep the official hand topology and the real
// landmark counts, but return fixed positions so every test can assert on
// exact coordinates. The demo page itself is NOT modified: the test runner
// swaps only the import URL.

function ellipse(n, cx, cy, rx, ry) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 0.55 + 0.45 * ((i * 37) % 11) / 10;
    out.push({ x: cx + Math.cos(a) * rx * r, y: cy + Math.sin(a) * ry * r, z: 0.01 });
  }
  return out;
}

// 21 points laid out the way MediaPipe orders them: wrist, then five chains
// of four running thumb -> pinky.
function makeHand(cx, cy, flip) {
  const pts = [{ x: cx, y: cy + 0.16, z: 0 }];
  for (let f = 0; f < 5; f++) {
    const ang = (-0.9 + f * 0.45) * (flip ? -1 : 1);
    for (let j = 1; j <= 4; j++) {
      const len = 0.045 * j * (f === 0 ? 0.8 : 1);
      pts.push({ x: cx + Math.sin(ang) * len, y: cy + 0.16 - Math.cos(ang) * len, z: 0.02 });
    }
  }
  return pts;
}

export const FACE_POINTS = ellipse(478, 0.5, 0.48, 0.17, 0.24);
export const HAND_POINTS = [makeHand(0.18, 0.5, false), makeHand(0.82, 0.5, true)];
// Raw model handedness, and what the page is expected to show for it.
// These match today because the label needs no flip; if the demo ever starts
// flipping again, DISPLAY_HANDEDNESS is what the tests assert against.
export const RAW_HANDEDNESS = ['Right', 'Left'];
export const DISPLAY_HANDEDNESS = ['Right', 'Left'];

const TESSELATION = [];
for (let i = 0; i < 477; i++) TESSELATION.push({ start: i, end: (i * 7 + 13) % 478 });

export const HAND_CONNECTIONS = [];
for (let f = 0; f < 5; f++) {
  HAND_CONNECTIONS.push({ start: 0, end: 1 + f * 4 });
  for (let j = 0; j < 3; j++) HAND_CONNECTIONS.push({ start: 1 + f * 4 + j, end: 2 + f * 4 + j });
}

export class FilesetResolver {
  static async forVisionTasks() { return {}; }
}

export class FaceLandmarker {
  static FACE_LANDMARKS_TESSELATION = TESSELATION;
  static async createFromOptions() { return new FaceLandmarker(); }
  detectForVideo() { return { faceLandmarks: [FACE_POINTS] }; }
}

export class HandLandmarker {
  static HAND_CONNECTIONS = HAND_CONNECTIONS;
  static async createFromOptions() { return new HandLandmarker(); }
  detectForVideo() {
    if (HandLandmarker.returnNoHands) return { landmarks: [], handednesses: [] };
    return {
      landmarks: HAND_POINTS,
      handednesses: RAW_HANDEDNESS.map(name => [{ categoryName: name }])
    };
  }
}

export class DrawingUtils {
  constructor(ctx) { this.ctx = ctx; }
  drawConnectors(lm, conns, opts) {
    const c = this.ctx, w = c.canvas.width, h = c.canvas.height;
    c.save();
    c.strokeStyle = opts.color;
    c.lineWidth = opts.lineWidth;
    for (const k of conns) {
      const a = lm[k.start], b = lm[k.end];
      if (!a || !b) continue;
      c.beginPath();
      c.moveTo(a.x * w, a.y * h);
      c.lineTo(b.x * w, b.y * h);
      c.stroke();
    }
    c.restore();
  }
}
