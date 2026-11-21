/**
 * A small 2D forward-kinematics rig that produces smooth, proportioned human
 * silhouettes (side view). Limbs are tapered capsules, the torso and head are
 * spline outlines, so the union reads as one clean filled silhouette.
 *
 * Angle convention (degrees), in the figure's own facing frame:
 *   limbs: 0 = pointing straight down, +90 = pointing forward, 180 = straight up
 *   lean / neck / head: 0 = upright, positive = tipping forward
 */
import { clamp, lerp } from "./math";

export type Build = "man" | "woman";
export type Body = { H: number; build: Build };

export type Pose = {
  x: number; // hip x (world)
  y: number; // hip y (world) — used when ground < 1
  ground: number; // 1 = feet planted on the floor automatically
  facing: number; // 1 = faces right, -1 = faces left (fractional during turns)
  depth: number; // 0 = in the room, 1 = far in the background (smaller)
  lean: number;
  neck: number;
  head: number;
  yaw: number; // head turning away from profile (for a "no" shake)
  nSh: number; nEl: number; nWr: number; // near arm
  fSh: number; fEl: number; fWr: number; // far arm
  nHip: number; nKnee: number; nFoot: number; // near leg
  fHip: number; fKnee: number; fFoot: number; // far leg
};

export const BASE: Pose = {
  x: 0, y: 0, ground: 1, facing: 1, depth: 0,
  lean: 2, neck: 4, head: 2, yaw: 0,
  nSh: -3, nEl: 8, nWr: 4,
  fSh: 4, fEl: 10, fWr: 4,
  nHip: 1, nKnee: 2, nFoot: 0,
  fHip: -2, fKnee: 2, fFoot: 0,
};

export const pose = (p: Partial<Pose>): Pose => ({ ...BASE, ...p });

export const mixPose = (a: Pose, b: Pose, t: number): Pose => {
  const out = { ...a };
  (Object.keys(a) as (keyof Pose)[]).forEach((k) => {
    out[k] = lerp(a[k], b[k], t);
  });
  return out;
};

/** Natural walk cycle; `phase` in radians. */
export const walkPose = (p: Pose, phase: number, amp = 1): Pose => {
  const s = Math.sin(phase);
  const c = Math.cos(phase);
  const swingN = Math.max(0, c);
  const swingF = Math.max(0, -c);
  return {
    ...p,
    lean: p.lean + 3 * amp,
    nHip: 24 * s * amp,
    fHip: -24 * s * amp,
    nKnee: (4 + 42 * Math.pow(swingN, 1.4)) * amp + 2,
    fKnee: (4 + 42 * Math.pow(swingF, 1.4)) * amp + 2,
    nFoot: 14 * swingN * amp - 6 * Math.max(0, -s) * amp,
    fFoot: 14 * swingF * amp - 6 * Math.max(0, s) * amp,
    nSh: -20 * s * amp,
    fSh: 20 * s * amp,
    nEl: 14 + 8 * Math.max(0, s) * amp,
    fEl: 14 + 8 * Math.max(0, -s) * amp,
  };
};

/** Distance covered by one full walk cycle (two steps) for a body. */
export const strideLength = (H: number) => 0.68 * H;

/* ---------------------------------------------------------------- geometry */

type V = [number, number];
const dir = (deg: number): V => {
  const r = (deg * Math.PI) / 180;
  return [Math.sin(r), Math.cos(r)];
};
const add = (a: V, b: V, k = 1): V => [a[0] + b[0] * k, a[1] + b[1] * k];
const rot = (p: V, deg: number): V => {
  const r = (deg * Math.PI) / 180;
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c];
};

/** Closed Catmull-Rom spline through points → smooth SVG path. */
export const smoothClosed = (pts: V[]) => {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1: V = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: V = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + " Z";
};

/** Tapered capsule outline from a (radius ra) to b (radius rb). */
const capsule = (a: V, ra: number, b: V, rb: number): V[] => {
  const th = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const pts: V[] = [];
  const N = 7;
  for (let i = 0; i <= N; i++) {
    const t = th - Math.PI / 2 + (Math.PI * i) / N;
    pts.push([b[0] + Math.cos(t) * rb, b[1] + Math.sin(t) * rb]);
  }
  for (let i = 0; i <= N; i++) {
    const t = th + Math.PI / 2 + (Math.PI * i) / N;
    pts.push([a[0] + Math.cos(t) * ra, a[1] + Math.sin(t) * ra]);
  }
  return pts;
};
const poly = (pts: V[]) =>
  "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ") + " Z";

/* ------------------------------------------------------------- body specs */

const SPEC = {
  man: {
    torso: 0.3,
    thigh: 0.245, shin: 0.238, ua: 0.172, fa: 0.152, hand: 0.088,
    headR: 0.064, neckLen: 0.042, neckR: 0.033,
    thighR: [0.064, 0.043], shinR: [0.045, 0.024], uaR: [0.039, 0.03], faR: [0.03, 0.021], handR: [0.022, 0.016],
    // torso outline, (u along spine 0=hip 1=neck base, v forward in H units)
    back: [[1.03, -0.045], [0.93, -0.085], [0.72, -0.08], [0.45, -0.062], [0.2, -0.07], [0.02, -0.088], [-0.1, -0.06]],
    front: [[-0.1, 0.055], [0.12, 0.07], [0.4, 0.066], [0.66, 0.085], [0.86, 0.075], [1.02, 0.03]],
  },
  woman: {
    torso: 0.29,
    thigh: 0.25, shin: 0.24, ua: 0.165, fa: 0.145, hand: 0.082,
    headR: 0.063, neckLen: 0.048, neckR: 0.026,
    thighR: [0.06, 0.038], shinR: [0.04, 0.02], uaR: [0.031, 0.024], faR: [0.024, 0.017], handR: [0.019, 0.014],
    back: [[1.03, -0.04], [0.92, -0.07], [0.7, -0.062], [0.42, -0.045], [0.18, -0.075], [0.0, -0.095], [-0.1, -0.065]],
    front: [[-0.1, 0.055], [0.12, 0.068], [0.38, 0.05], [0.6, 0.08], [0.72, 0.085], [0.88, 0.058], [1.02, 0.028]],
  },
};

const HEAD: V[] = [
  [0, -1.04], [-0.62, -0.86], [-0.98, -0.32], [-0.92, 0.3], [-0.55, 0.72],
  [-0.15, 0.86], [0.32, 0.86], [0.66, 0.66], [0.84, 0.44], [0.86, 0.3],
  [0.95, 0.2], [1.1, 0.04], [0.98, -0.08], [0.92, -0.38], [0.68, -0.82],
];
const HAIR: Record<Build, V[]> = {
  man: [
    [0.74, -0.62], [0.42, -1.04], [-0.2, -1.14], [-0.8, -0.86], [-1.08, -0.3],
    [-1.02, 0.28], [-0.7, 0.42], [-0.3, -0.2], [0.3, -0.62],
  ],
  woman: [
    [0.84, -0.42], [0.62, -1.0], [0.0, -1.2], [-0.72, -1.02], [-1.14, -0.42],
    [-1.2, 0.35], [-1.18, 1.25], [-1.08, 2.05], [-0.8, 2.45], [-0.48, 2.2],
    [-0.42, 1.3], [-0.38, 0.62], [0.12, 0.0], [0.62, -0.3],
  ],
};

export type Rig = {
  paths: string[];
  handN: V; handF: V; mouth: V; headC: V; shoulder: V; hip: V;
  scale: number;
};

export const buildRig = (p: Pose, body: Body, floorY: number): Rig => {
  const sp = SPEC[body.build];
  const H = body.H;

  // ---- local skeleton (origin = hip, forward = +x, y down) ----
  const hip: V = [0, 0];
  const up: V = [Math.sin((p.lean * Math.PI) / 180), -Math.cos((p.lean * Math.PI) / 180)];
  const fwd: V = [-up[1], up[0]];
  const tL = sp.torso * H;
  const tp = (u: number, v: number): V => add(add(hip, up, u * tL), fwd, v * H);

  const shoulder = tp(0.92, -0.005);
  const neckBase = tp(1.0, -0.01);
  const na = p.lean + p.neck;
  const neckTop = add(neckBase, [Math.sin((na * Math.PI) / 180), -Math.cos((na * Math.PI) / 180)], sp.neckLen * H);
  const ha = na + p.head;
  const hr = sp.headR * H;
  const yawK = 1 - 0.42 * Math.abs(Math.sin((p.yaw * Math.PI) / 180));
  const yawShift = Math.sin((p.yaw * Math.PI) / 180) * 0.12;
  const headPt = (q: V, gravity = 0): V => {
    const ang = ha * (1 - gravity * clamp(q[1] / 2.2));
    const local: V = [(q[0] * yawK + yawShift) * hr, q[1] * hr];
    const off = rot([0.14 * hr, -0.86 * hr], ha);
    return add(add(neckTop, off), rot(local, ang));
  };
  const headC = headPt([0, 0]);
  const mouth = headPt([0.9, 0.36]);

  const arm = (sh: number, el: number, wr: number) => {
    const E = add(shoulder, dir(sh), sp.ua * H);
    const W = add(E, dir(sh + el), sp.fa * H);
    const T = add(W, dir(sh + el + wr), sp.hand * H);
    return { E, W, T };
  };
  const leg = (h: number, k: number, f: number) => {
    const K = add(hip, dir(h), sp.thigh * H);
    const A = add(K, dir(h - k), sp.shin * H);
    const pr = (f * Math.PI) / 180;
    const fv: V = [Math.cos(pr), -Math.sin(pr)];
    const dn: V = [Math.sin(pr), Math.cos(pr)];
    const heel = add(add(A, fv, -0.032 * H), dn, 0.03 * H);
    const toe = add(heel, fv, 0.135 * H);
    return { K, A, heel, toe };
  };
  const aN = arm(p.nSh, p.nEl, p.nWr);
  const aF = arm(p.fSh, p.fEl, p.fWr);
  const lN = leg(p.nHip, p.nKnee, p.nFoot);
  const lF = leg(p.fHip, p.fKnee, p.fFoot);

  // ---- placement in the world ----
  const S = 1 - 0.2 * p.depth;
  const lowest = Math.max(lN.heel[1], lN.toe[1], lF.heel[1], lF.toe[1]) + 0.02 * H;
  const floor = floorY - 46 * p.depth;
  const rootY = lerp(p.y, floor - lowest * S, p.ground);
  const m = Math.sign(p.facing || 1) * Math.max(0.22, Math.abs(p.facing));
  const W = (q: V): V => [p.x + q[0] * m * S, rootY + q[1] * S];
  const Wp = (pts: V[]) => pts.map(W);

  const paths: string[] = [];
  const cap = (a: V, ra: number, b: V, rb: number) =>
    paths.push(poly(Wp(capsule(a, ra * H, b, rb * H))));

  // far limbs first (same fill — order only matters for readability)
  cap(shoulder, sp.uaR[0], aF.E, sp.uaR[1]);
  cap(aF.E, sp.faR[0], aF.W, sp.faR[1]);
  cap(aF.W, sp.handR[0], aF.T, sp.handR[1]);
  cap(hip, sp.thighR[0], lF.K, sp.thighR[1]);
  cap(lF.K, sp.shinR[0], lF.A, sp.shinR[1]);
  cap(lF.A, 0.024, lF.heel, 0.024);
  cap(lF.heel, 0.024, lF.toe, 0.014);

  // torso
  const tPts: V[] = [...sp.back, ...sp.front].map(([u, v]) => tp(u, v));
  paths.push(smoothClosed(Wp(tPts)));

  // dress / coat skirt for the woman
  if (body.build === "woman") {
    const kx = [lN.K[0], lF.K[0]];
    const hemY = Math.max(lN.K[1], lF.K[1]) + 0.035 * H;
    const spread = Math.min(Math.max(...kx) - Math.min(...kx), 0.16 * H);
    const mid = (lN.K[0] + lF.K[0]) / 2;
    const back = mid - spread / 2 - 0.06 * H;
    const front = mid + spread / 2 + 0.055 * H;
    const skirt: V[] = [
      tp(0.42, -0.052), tp(0.12, -0.085), tp(-0.05, -0.1),
      [back, hemY - 0.01 * H], [lerp(back, front, 0.5), hemY + 0.012 * H], [front, hemY],
      tp(-0.04, 0.08), tp(0.2, 0.07), tp(0.42, 0.052),
    ];
    paths.push(smoothClosed(Wp(skirt)));
  }

  // near leg
  cap(hip, sp.thighR[0], lN.K, sp.thighR[1]);
  cap(lN.K, sp.shinR[0], lN.A, sp.shinR[1]);
  cap(lN.A, 0.024, lN.heel, 0.024);
  cap(lN.heel, 0.024, lN.toe, 0.014);

  // neck + head + hair
  cap(neckBase, sp.neckR + 0.006, neckTop, sp.neckR);
  paths.push(smoothClosed(Wp(HEAD.map((q) => headPt(q)))));
  paths.push(smoothClosed(Wp(HAIR[body.build].map((q) => headPt(q, body.build === "woman" ? 0.75 : 0)))));

  // near arm
  cap(shoulder, sp.uaR[0], aN.E, sp.uaR[1]);
  cap(aN.E, sp.faR[0], aN.W, sp.faR[1]);
  cap(aN.W, sp.handR[0], aN.T, sp.handR[1]);

  return {
    paths,
    handN: W(aN.T),
    handF: W(aF.T),
    mouth: W(mouth),
    headC: W(headC),
    shoulder: W(shoulder),
    hip: W(hip),
    scale: S,
  };
};

/** Horizontal distance from hip to the near hand tip for a pose (world px, facing applied). */
export const handReach = (p: Pose, body: Body, which: "n" | "f" = "n") => {
  const r = buildRig({ ...p, x: 0, depth: 0 }, body, 1000);
  return (which === "n" ? r.handN : r.handF)[0];
};
