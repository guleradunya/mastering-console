import React from "react";
import { AbsoluteFill } from "remotion";
import { buildRig, walkPose, Body } from "./lib/rig";
import { P } from "./lib/poses";

const MAN: Body = { H: 440, build: "man" };
const WOMAN: Body = { H: 415, build: "woman" };

export const RigTest: React.FC = () => {
  const floor = 900;
  const items: { body: Body; p: ReturnType<typeof walkPose>; x: number; y?: number }[] = [
    { body: MAN, p: P.stand, x: 120 },
    { body: MAN, p: walkPose(P.stand, 0.8), x: 330 },
    { body: MAN, p: { ...P.sitChair, y: 740 }, x: 540 },
    { body: MAN, p: P.palm, x: 740 },
    { body: MAN, p: P.bothPalms, x: 960 },
    { body: MAN, p: { ...P.sitFloor, y: 900 - 0.07 * 440, facing: -1 }, x: 1200 },
    { body: WOMAN, p: { ...P.fixHair, facing: -1 }, x: 1380 },
    { body: WOMAN, p: P.sip, x: 1560 },
    { body: WOMAN, p: walkPose(P.stand, 2.2), x: 1760 },
  ];
  return (
    <AbsoluteFill style={{ background: "#c9b9a0" }}>
      <svg width={1920} height={1080}>
        <line x1={0} x2={1920} y1={floor} y2={floor} stroke="#555" />
        {items.map((it, i) => {
          const r = buildRig({ ...it.p, x: it.x }, it.body, floor);
          return (
            <g key={i} fill="#111">
              {r.paths.map((d, j) => (
                <path key={j} d={d} />
              ))}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
