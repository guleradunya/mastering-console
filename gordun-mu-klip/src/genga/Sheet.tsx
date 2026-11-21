import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import {
  BLUE,
  GRAPHITE,
  GRAPHITE_LIGHT,
  PAPER,
  PencilDefs,
  RED,
  rand,
  useStepFrame,
} from "./pencil";

export const HAND = "Klee One";
loadFont({ family: HAND, url: staticFile("fonts/KleeOne-Regular.woff2"), weight: "400" });
loadFont({ family: HAND, url: staticFile("fonts/KleeOne-SemiBold.woff2"), weight: "600" });

/** Text that appears as if written by hand, letter by letter. */
export const Written: React.FC<{
  text: string;
  start: number;
  cps?: number; // characters per second at 24fps
  style?: React.CSSProperties;
}> = ({ text, start, cps = 14, style }) => {
  const frame = useCurrentFrame();
  const step = Math.floor(frame / 3) * 3;
  const n = Math.floor(Math.max(0, step - start) * (cps / 24));
  return (
    <span style={style}>
      <span>{text.slice(0, n)}</span>
      <span style={{ opacity: 0 }}>{text.slice(n)}</span>
    </span>
  );
};

type SheetProps = {
  cut: number;
  /** 秒+コマ length note written in the header, e.g. "5+12" */
  length: string;
  lyric?: string;
  lyricStart?: number;
  lyricCps?: number;
  note?: string;
  children: React.ReactNode;
};

/**
 * One sheet of genga paper: grain, peg holes, frame guide, cut header,
 * dialogue (セリフ) box with the lyric, and the pencil-test camera flicker.
 */
export const Sheet: React.FC<SheetProps> = ({
  cut,
  length,
  lyric,
  lyricStart = 6,
  lyricCps = 16,
  note,
  children,
}) => {
  const frame = useCurrentFrame();
  const step = useStepFrame();
  const filterId = `pencil-${cut}`;
  // each sheet sits slightly differently under the camera
  const rot = (rand(cut * 3.1) - 0.5) * 1.2;
  const ox = (rand(cut * 5.7) - 0.5) * 14;
  const oy = (rand(cut * 9.3) - 0.5) * 10;
  // pencil-test exposure flicker + tiny camera shake, on threes
  const flick = 0.96 + rand(step * 0.37 + cut) * 0.06;
  const shakeX = (rand(step * 1.3) - 0.5) * 1.6;
  const shakeY = (rand(step * 2.1) - 0.5) * 1.6;
  const settle = interpolate(frame, [0, 5], [10, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#141210", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          translate: `${ox + shakeX}px ${oy + shakeY + settle}px`,
          rotate: `${rot}deg`,
          scale: 1.04,
          filter: `brightness(${flick})`,
        }}
      >
        <svg
          width={1920}
          height={1080}
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <filter id={`paper-${cut}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves={3}
                seed={cut}
              />
              <feColorMatrix
                values="0 0 0 0 0.35  0 0 0 0 0.31  0 0 0 0 0.25  0 0 0 0.16 0"
              />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
            <filter id={`fiber-${cut}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.004 0.06"
                numOctaves={2}
                seed={cut + 40}
              />
              <feColorMatrix
                values="0 0 0 0 0.4  0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0.09 0"
              />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
            <radialGradient id={`vig-${cut}`} cx="50%" cy="50%" r="75%">
              <stop offset="55%" stopColor="#000" stopOpacity={0} />
              <stop offset="100%" stopColor="#2a2016" stopOpacity={0.45} />
            </radialGradient>
          </defs>
          <rect width={1920} height={1080} fill={PAPER} />
          <rect width={1920} height={1080} fill="#fff" filter={`url(#paper-${cut})`} />
          <rect width={1920} height={1080} fill="#fff" filter={`url(#fiber-${cut})`} />

          {/* peg holes (タップ穴) */}
          {[-1, 0, 1].map((i) => (
            <g key={i}>
              {i === 0 ? (
                <circle cx={960} cy={74} r={13} fill="#1c1916" />
              ) : (
                <rect
                  x={960 + i * 230 - 34}
                  y={66}
                  width={68}
                  height={16}
                  rx={8}
                  fill="#1c1916"
                />
              )}
            </g>
          ))}

          {/* frame guide (作画フレーム) with corner marks */}
          <g stroke={GRAPHITE_LIGHT} strokeWidth={1.4} fill="none" opacity={0.7}>
            <rect x={150} y={118} width={1620} height={872} />
            <rect
              x={200}
              y={137}
              width={1520}
              height={826}
              strokeDasharray="10 8"
              opacity={0.6}
            />
            <path d="M 960 528 l 0 24 M 948 540 l 24 0" />
          </g>
        </svg>

        {/* drawing layer */}
        <svg
          width={1920}
          height={1080}
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0 }}
        >
          <PencilDefs id={filterId} />
          <g filter={`url(#${filterId})`}>{children}</g>
        </svg>

        {/* header: cut table */}
        <div
          style={{
            position: "absolute",
            left: 170,
            top: 52,
            display: "flex",
            fontFamily: HAND,
            color: GRAPHITE,
            fontSize: 22,
            border: `1.5px solid ${GRAPHITE_LIGHT}`,
          }}
        >
          {[
            ["カット", String(cut).padStart(3, "0")],
            ["秒", length],
            ["原画", "G."],
          ].map(([k, v], i) => (
            <div
              key={k}
              style={{
                display: "flex",
                borderLeft: i ? `1.5px solid ${GRAPHITE_LIGHT}` : undefined,
              }}
            >
              <div
                style={{
                  padding: "6px 10px",
                  fontSize: 15,
                  color: GRAPHITE_LIGHT,
                  borderRight: `1px solid ${GRAPHITE_LIGHT}`,
                }}
              >
                {k}
              </div>
              <div style={{ padding: "4px 16px", fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            right: 170,
            top: 58,
            fontFamily: HAND,
            fontSize: 22,
            color: GRAPHITE_LIGHT,
          }}
        >
          「Gördün mü?」
        </div>

        {note ? (
          <div
            style={{
              position: "absolute",
              right: 180,
              top: 140,
              fontFamily: HAND,
              fontSize: 26,
              color: RED,
              rotate: "-2deg",
            }}
          >
            <Written text={note} start={2} cps={18} />
          </div>
        ) : null}

        {lyric ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 14,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: HAND,
                fontWeight: 600,
                fontSize: 54,
                color: GRAPHITE,
                padding: "6px 30px 10px",
                borderBottom: `2px solid ${BLUE}55`,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  color: BLUE,
                  marginRight: 18,
                  fontWeight: 400,
                  verticalAlign: "middle",
                }}
              >
                セリフ
              </span>
              <Written text={lyric} start={lyricStart} cps={lyricCps} />
            </div>
          </div>
        ) : null}

        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <rect width={1920} height={1080} fill={`url(#vig-${cut})`} />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
