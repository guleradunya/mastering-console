import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

// Hand-drawn animation is shot "on threes": the drawing only changes every 3rd frame.
export const ON = 3;
/** Per-cut speed factor so a drawing designed for N frames fits a shorter cut. */
export const TimeScale = React.createContext(1);
export const useStepFrame = () => {
  const frame = useCurrentFrame();
  const scale = React.useContext(TimeScale);
  return Math.floor(frame / ON) * ON * scale;
};

export const GRAPHITE = "#3b3a3d";
export const GRAPHITE_LIGHT = "#8d8a8c";
export const RED = "#c8463c";
export const BLUE = "#3f6fb0";
export const PAPER = "#efe9dc";

// Deterministic pseudo random in [0,1)
export const rand = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * SVG filter defs: "boil" (line wobble that changes every 3 frames, like
 * redrawn lines) + graphite grain. Put once inside each <svg>.
 */
export const PencilDefs: React.FC<{ id: string; wobble?: number }> = ({
  id,
  wobble = 2.6,
}) => {
  const step = useStepFrame();
  const seed = (Math.floor(step / ON) % 7) + 1;
  return (
    <defs>
      <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.035"
          numOctaves={2}
          seed={seed}
          result="warp"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="warp"
          scale={wobble}
          xChannelSelector="R"
          yChannelSelector="G"
          result="wobbled"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves={1}
          seed={seed + 11}
          result="grain"
        />
        <feColorMatrix
          in="grain"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.75"
          result="grainAlpha"
        />
        <feComposite in="wobbled" in2="grainAlpha" operator="in" />
      </filter>
    </defs>
  );
};

type StrokeProps = {
  d: string;
  color?: string;
  width?: number;
  /** frame (relative to sequence) at which drawing starts */
  start?: number;
  /** frames to draw the line */
  dur?: number;
  /** number of sketchy passes */
  passes?: number;
  opacity?: number;
  dash?: string;
};

/** A pencil line that draws itself on, sketched with a few loose passes. */
export const Stroke: React.FC<StrokeProps> = ({
  d,
  color = GRAPHITE,
  width = 2.4,
  start = 0,
  dur = 12,
  passes = 2,
  opacity = 1,
  dash,
}) => {
  const step = useStepFrame();
  const progress = interpolate(step, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0.1, 0.4, 1),
  });
  if (progress <= 0) return null;
  const seed = d.length;
  return (
    <g opacity={opacity}>
      {new Array(passes).fill(0).map((_, i) => {
        const dx = i === 0 ? 0 : (rand(seed + i) - 0.5) * 3;
        const dy = i === 0 ? 0 : (rand(seed + i * 7) - 0.5) * 3;
        return (
          <path
            key={i}
            d={d}
            transform={`translate(${dx} ${dy})`}
            fill="none"
            stroke={color}
            strokeWidth={i === 0 ? width : width * 0.55}
            strokeOpacity={i === 0 ? 0.92 : 0.45}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={dash ? undefined : "1 1"}
            strokeDashoffset={dash ? undefined : 1 - progress}
            style={dash ? { strokeDasharray: dash } : undefined}
          />
        );
      })}
    </g>
  );
};

/** Group of strokes drawn one after another. */
export const Drawing: React.FC<{
  paths: string[];
  start?: number;
  each?: number;
  overlap?: number;
  color?: string;
  width?: number;
  passes?: number;
  opacity?: number;
  /** loose construction sketch under the clean line (px offset, 0 = none) */
  rough?: number;
}> = ({
  paths,
  start = 0,
  each = 9,
  overlap = 5,
  color,
  width,
  passes,
  opacity,
  rough = 0,
}) => (
  <>
    {rough > 0 &&
      paths.map((p, i) => (
        <g
          key={`r${i}`}
          transform={`translate(${(rand(i * 13 + p.length) - 0.5) * rough} ${(rand(i * 17 + p.length) - 0.5) * rough})`}
        >
          <Stroke
            d={p}
            start={Math.max(0, start + i * (each - overlap) - 4)}
            dur={Math.max(3, each - 2)}
            color={GRAPHITE_LIGHT}
            width={1.3}
            passes={1}
            opacity={0.38}
          />
        </g>
      ))}
    {paths.map((p, i) => (
      <Stroke
        key={i}
        d={p}
        start={start + i * (each - overlap)}
        dur={each}
        color={color}
        width={width}
        passes={passes}
        opacity={opacity}
      />
    ))}
  </>
);

/** Colored-pencil hatching inside a box, clipped by a path (shadow areas). */
export const Hatch: React.FC<{
  clip: string;
  id: string;
  color?: string;
  box: [number, number, number, number];
  gap?: number;
  angle?: number;
  start?: number;
  dur?: number;
  opacity?: number;
}> = ({
  clip,
  id,
  color = BLUE,
  box,
  gap = 9,
  angle = 35,
  start = 0,
  dur = 14,
  opacity = 0.75,
}) => {
  const step = useStepFrame();
  const progress = interpolate(step, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const [x, y, w, h] = box;
  const diag = Math.hypot(w, h);
  const lines: string[] = [];
  const n = Math.ceil((diag * 2) / gap);
  const shown = Math.floor(n * progress);
  for (let i = 0; i < shown; i++) {
    const o = -diag + i * gap;
    lines.push(`M ${x + o} ${y - 20} l ${diag} ${diag}`);
  }
  if (!shown) return null;
  return (
    <g opacity={opacity}>
      <clipPath id={id}>
        <path d={clip} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <g transform={`rotate(${angle - 45} ${x + w / 2} ${y + h / 2})`}>
          {lines.map((l, i) => (
            <path
              key={i}
              d={l}
              stroke={color}
              strokeWidth={1.6}
              strokeOpacity={0.55 + rand(i) * 0.35}
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </g>
      </g>
    </g>
  );
};
