import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";
import { Sheet } from "./genga/Sheet";
import { CutAlone, CutEye, CutHeart, CutLeaving } from "./scenes/ChorusCuts";

export const FPS = 24;

// Chorus timing in seconds (relative to the song). Filled in from the lyric analysis.
export const CHORUS = {
  songStart: 38,
  lines: [
    { at: 0, text: "Ben mi yabancı oldum", cut: 12, Scene: CutAlone, note: "雨 · yağmur" },
    { at: 5, text: "Sen mi gittin?", cut: 13, Scene: CutLeaving, note: "奥へ → uzaklaşır" },
    { at: 10, text: "Sana aşkla bakarken", cut: 14, Scene: CutEye, note: "涙 · gözyaşı" },
    { at: 15, text: "Başka kalbe mi aittin?", cut: 15, Scene: CutHeart, note: "ヒビ · çatlak" },
  ],
  end: 20,
};

const secLen = (s: number) => {
  const f = Math.round(s * FPS);
  return `${Math.floor(f / FPS)}+${f % FPS}`;
};

export const Deneme: React.FC = () => {
  const { lines, end, songStart } = CHORUS;
  return (
    <AbsoluteFill style={{ backgroundColor: "#141210" }}>
      <Audio src={staticFile("gordun-mu.mp3")} trimBefore={Math.round(songStart * FPS)} />
      {lines.map((l, i) => {
        const from = Math.round(l.at * FPS);
        const to = Math.round((lines[i + 1]?.at ?? end) * FPS);
        const { Scene } = l;
        return (
          <Sequence key={i} from={from} durationInFrames={to - from} name={l.text}>
            <Sheet cut={l.cut} length={secLen((to - from) / FPS)} lyric={l.text} note={l.note}>
              <Scene />
            </Sheet>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
