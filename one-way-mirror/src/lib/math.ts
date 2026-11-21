export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0→1 progress of t through [a, b], clamped. */
export const prog = (t: number, a: number, b: number) =>
  b === a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a));

export const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeIn = (x: number) => x * x * x;
export const smooth = (x: number) => x * x * (3 - 2 * x);

/** Deterministic hash → [0, 1). */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

/** Smooth 1D value noise in [-1, 1]. */
export const noise1 = (x: number, seed = 0) => {
  const i = Math.floor(x);
  const f = x - i;
  const a = rand(i + seed * 1000) * 2 - 1;
  const b = rand(i + 1 + seed * 1000) * 2 - 1;
  return lerp(a, b, smooth(f));
};

/** Fractal noise, two octaves. */
export const fbm = (x: number, seed = 0) =>
  noise1(x, seed) * 0.7 + noise1(x * 2.13, seed + 7) * 0.3;

const hex = (c: string) => [
  parseInt(c.slice(1, 3), 16),
  parseInt(c.slice(3, 5), 16),
  parseInt(c.slice(5, 7), 16),
];
/** Mix two #rrggbb colors. */
export const mixColor = (a: string, b: string, t: number) => {
  const A = hex(a);
  const B = hex(b);
  const m = A.map((v, i) => Math.round(lerp(v, B[i], clamp(t))));
  return `rgb(${m[0]},${m[1]},${m[2]})`;
};
