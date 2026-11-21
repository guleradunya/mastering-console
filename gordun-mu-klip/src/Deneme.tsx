import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Sheet } from "./genga/Sheet";
import { TimeScale } from "./genga/pencil";
import { CutAlone, CutEye, CutHeart, CutLeaving } from "./scenes/ChorusCuts";

export const FPS = 24;

/**
 * Trial: the second chorus. Times are seconds in the song, taken from the
 * Whisper word timestamps (sung = when the line is sung, sungEnd = last word).
 * `speed` squeezes a drawing animation into a short cut.
 */
export const CHORUS = {
  songStart: 94.6,
  end: 110.1,
  lines: [
    { cut: 12, at: 94.6, sung: 95.7, sungEnd: 99.9, text: "Ben mi yabancı oldum", Scene: CutAlone, note: "雨 · yağmur", speed: 1 },
    { cut: 13, at: 100.3, sung: 100.44, sungEnd: 101.9, text: "Sen mi gittin?", Scene: CutLeaving, note: "奥へ → uzaklaşır", speed: 1.3 },
    { cut: 14, at: 102.7, sung: 102.8, sungEnd: 105.3, text: "Sana aşkla bakarken", Scene: CutEye, note: "涙 · gözyaşı", speed: 1.5 },
    { cut: 15, at: 105.5, sung: 105.64, sungEnd: 109.0, text: "Başka kalplere mi aittin?", Scene: CutHeart, note: "ヒビ · çatlak", speed: 1 },
  ],
};

const secLen = (frames: number) => `${Math.floor(frames / FPS)}+${frames % FPS}`;

export const Deneme: React.FC = () => {
  const { lines, end, songStart } = CHORUS;
  const total = Math.round((end - songStart) * FPS);
  return (
    <AbsoluteFill style={{ backgroundColor: "#141210" }}>
      <Audio
        src={staticFile("gordun-mu.mp3")}
        trimBefore={Math.round(songStart * FPS)}
        volume={(f) =>
          interpolate(f, [0, 8, total - 24, total], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {lines.map((l, i) => {
        const from = Math.round((l.at - songStart) * FPS);
        const to = Math.round(((lines[i + 1]?.at ?? end) - songStart) * FPS);
        const { Scene } = l;
        return (
          <Sequence key={i} from={from} durationInFrames={to - from} name={l.text}>
            <TimeScale.Provider value={l.speed}>
              <Sheet
                cut={l.cut}
                length={secLen(to - from)}
                lyric={l.text}
                lyricStart={Math.round((l.sung - l.at) * FPS)}
                lyricCps={l.text.length / (l.sungEnd - l.sung)}
                note={l.note}
              >
                <Scene />
              </Sheet>
            </TimeScale.Provider>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
