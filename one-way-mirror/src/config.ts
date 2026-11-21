/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GÖRDÜN MÜ? — "One-Way Mirror"  ·  master configuration
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every time below is in SECONDS of the song. Change a number, the whole video
 *  (choreography, lights, glass, camera, lyrics) re-times itself.
 *
 *  The defaults are measured from the supplied Gordun_mu.mp3 (3:32):
 *  section starts and lyric lines come from word-level speech timestamps.
 */

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
  audioFile: "Gordun_mu.mp3",
  /** Used only if the audio duration can't be read (e.g. the file is missing). */
  fallbackDurationInSeconds: 240,
  /** Small tail of silence/black after the audio ends. */
  tailSeconds: 1.5,
};

type Span = { start: number; end: number };

export const TIMELINE = {
  /** Clean guitar arpeggios. Slow push-in, he sits, she fixes her hair. */
  intro: { start: 0, end: 15.0 },
  /** He stands, walks to the glass, palm on glass, his voice bounces back. */
  verse1: { start: 15.0, end: 38.9 },
  /** Door opens on her side, someone enters, she turns warmly to them. */
  chorus1: { start: 38.9, end: 53.3 },
  /** Instrumental after chorus 1: they leave together, the warm room empties. */
  interlude: { start: 53.3, end: 67.4 },
  /** Empty warm room dims. He sinks to the floor, back against the glass. */
  verse2: { start: 67.4, end: 95.6 },
  /** Chorus 2 (×2). Handheld camera, he stands, both palms on the glass. */
  chorus2: { start: 95.6, end: 123.6 },
  /** Guitar solo. */
  solo: { start: 123.6, end: 151.0 },
  /** Solo peak: his overhead tungsten lights flicker on; the glass turns clear. */
  soloClimax: { start: 134.5, end: 150.5 },
  /** Quiet bridge. Still camera. She returns, sees him, raises her hand. */
  bridge: { start: 151.0, end: 176.4 },
  /** He walks to the wall and switches his light off; mirror snaps back. */
  finalChorus: { start: 176.4, end: 190.8 },
  /** He walks out through the dim exit door. */
  outro: { start: 190.8, end: 212.0 },
} satisfies Record<string, Span>;

/** Exact sync points inside the sections (seconds). */
export const CUES = {
  /** he gets up from the chair */
  manStands: 16.0,
  /** the door on her side starts to open */
  doorOpens: 40.0,
  /** she and the stranger leave through the door */
  coupleLeaves: 55.0,
  /** door closes behind them */
  doorCloses: 63.5,
  /** he slides down to the floor */
  manSinks: 70.0,
  /** her door opens again in the bridge */
  womanReturns: 151.3,
  /** she freezes — she can see him */
  womanSeesHim: 156.8,
  /** "Gördüysen de hiç dokunma" — he shakes his head */
  headShake: 163.1,
  /** he flips the switch */
  lightsOff: 184.0,
  /** he turns to the exit */
  manLeaves: 193.0,
} as const;

export type LyricLine = { start: number; end: number; text: string };

/** Subtitle lines (seconds). Measured from the song. */
export const LYRICS: LyricLine[] = [
  // Verse 1
  { start: 15.2, end: 17.4, text: "Gördün mü," },
  { start: 17.8, end: 23.2, text: "Gönlümü kaybettim buralarda" },
  { start: 25.3, end: 29.1, text: "Sesim duyulmaz oldu" },
  { start: 29.3, end: 37.6, text: "Feryadım saklı yaralarımda" },
  // Chorus 1
  { start: 39.3, end: 45.1, text: "Ben mi yabancı oldum, sen mi gittin?" },
  { start: 45.3, end: 53.3, text: "Sana aşkla bakarken başka kalplere mi aittin?" },
  // Verse 2
  { start: 68.3, end: 72.4, text: "Aradım hep eski günleri" },
  { start: 76.3, end: 79.6, text: "Mutluymuşuz, bilemedim" },
  { start: 81.5, end: 87.4, text: "Korkarken kendi sözlerimden" },
  { start: 88.8, end: 95.0, text: "Sessizce ağlamayı öğrendim" },
  // Chorus 2
  { start: 96.0, end: 102.6, text: "Ben mi yabancı oldum, sen mi gittin?" },
  { start: 102.9, end: 109.5, text: "Sana aşkla bakarken başka kalplere mi aittin?" },
  { start: 110.3, end: 116.6, text: "Ben mi yabancı oldum, sen mi gittin?" },
  { start: 116.8, end: 123.7, text: "Sana aşkla bakarken başka kalplere mi aittin?" },
  // Bridge
  { start: 151.6, end: 154.0, text: "Gördün mü," },
  { start: 155.2, end: 160.6, text: "Gönlümü kaybettim buralarda" },
  { start: 163.1, end: 169.1, text: "Gördüysen de hiç dokunma" },
  { start: 169.3, end: 175.6, text: "Kayıp bir hikâye nasılsa" },
  // Final chorus
  { start: 177.3, end: 183.9, text: "Ben mi yabancı oldum, sen mi gittin?" },
  { start: 184.1, end: 190.9, text: "Sana aşkla bakarken başka kalplere mi aittin?" },
];

export const PALETTE = {
  // man's room — cold midnight
  coldDeep: "#070B14",
  coldMid: "#101B2D",
  coldEdge: "#1C2C45",
  moon: "#8FB4E8",
  // woman's room — tungsten
  warmDeep: "#2A1B10",
  warmMid: "#7A4A22",
  warmGlow: "#D98A3C",
  tungsten: "#FFC77A",
  // silhouettes
  silhouetteCold: "#020306",
  silhouetteWarm: "#0B0604",
  // type
  lyric: "#EFE6D8",
};

/** Room geometry (px in the 1920×1080 frame). */
export const ROOM = {
  ceiling: 150,
  floor: 852,
  glassX: 960,
  glassHalf: 26,
  /** left wall switch */
  switchX: 120,
  switchY: 585,
  /** man's exit door (back wall) */
  exitDoor: { x: 196, w: 132, top: 438 },
  /** woman's door (back wall) */
  herDoor: { x: 1700, w: 140, top: 430 },
  chairX: 560,
  tableX: 1540,
  letterbox: 96,
};
