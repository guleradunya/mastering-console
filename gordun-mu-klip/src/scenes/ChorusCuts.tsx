import React from "react";
import { interpolate, useVideoConfig } from "remotion";
import {
  BLUE,
  Drawing,
  GRAPHITE,
  GRAPHITE_LIGHT,
  Hatch,
  RED,
  Stroke,
  rand,
  useStepFrame,
} from "../genga/pencil";

/* ---------- shared bits ---------- */

/** Rain streaks redrawn every 3 frames. */
export const Rain: React.FC<{ count?: number; opacity?: number }> = ({
  count = 70,
  opacity = 0.5,
}) => {
  const step = useStepFrame();
  return (
    <g opacity={opacity}>
      {new Array(count).fill(0).map((_, i) => {
        const speed = 38 + rand(i * 3) * 20;
        const x0 = 170 + rand(i) * 1600;
        const y = ((rand(i * 7) * 900 + step * speed) % 860) + 120;
        const x = x0 - (y - 120) * 0.18;
        const len = 26 + rand(i * 11) * 30;
        return (
          <path
            key={i}
            d={`M ${x} ${y} l ${-len * 0.18} ${len}`}
            stroke={GRAPHITE_LIGHT}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};

/** Slow camera push, stepped on threes like a rostrum camera move. */
const Push: React.FC<{
  from?: number;
  to?: number;
  cx?: number;
  cy?: number;
  children: React.ReactNode;
}> = ({ from = 1, to = 1.08, cx = 960, cy = 540, children }) => {
  const step = useStepFrame();
  const { durationInFrames } = useVideoConfig();
  const s = interpolate(step, [0, durationInFrames], [from, to]);
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`}>
      {children}
    </g>
  );
};

/* ---------- CUT 1: woman alone under a streetlight ---------- */

export const WOMAN_HAIR = [
  "M 958 372 C 928 372 918 398 922 428 C 926 470 916 520 905 575 C 902 590 906 600 912 606",
  "M 958 372 C 990 370 1000 398 996 430 C 1004 462 1034 484 1074 492 C 1090 495 1104 492 1116 486",
  "M 990 450 C 1020 482 1060 494 1104 500",
  "M 982 474 C 1010 512 1044 524 1084 530",
  "M 972 500 C 990 540 1010 556 1040 566",
  "M 912 606 C 930 612 950 606 962 596 C 970 588 972 578 968 566",
  "M 940 392 C 934 450 940 520 930 590",
  "M 958 386 C 960 450 962 520 950 600",
  "M 976 392 C 984 440 980 500 968 560",
];
export const WOMAN_BODY = [
  "M 926 476 C 902 480 888 492 884 512 C 878 570 872 640 870 700",
  "M 994 476 C 1018 480 1032 494 1036 514 C 1042 570 1046 640 1048 700",
  "M 894 540 C 890 620 884 720 872 800",
  "M 1026 540 C 1030 620 1036 720 1050 800",
  "M 872 800 C 900 812 930 806 960 812 C 990 818 1020 808 1050 800",
  "M 896 650 C 930 658 990 658 1026 650",
  "M 1000 656 C 1004 680 998 700 1002 720",
  "M 1008 656 C 1016 676 1014 690 1020 708",
  "M 960 660 L 961 812",
  "M 920 690 C 918 730 912 770 906 806",
  "M 1000 724 C 1004 756 1010 780 1016 806",
  "M 880 600 C 888 606 892 612 892 620",
  "M 1040 600 C 1032 606 1028 612 1028 620",
  "M 868 702 C 864 722 876 734 884 718 C 886 712 884 706 880 700",
  "M 1046 702 C 1048 722 1062 730 1062 712 C 1060 706 1056 702 1050 700",
];
export const WOMAN_LEGS = [
  "M 928 812 L 926 900",
  "M 948 812 L 948 902",
  "M 974 812 L 974 902",
  "M 994 812 L 998 900",
  "M 920 900 C 922 914 950 914 952 902",
  "M 970 902 C 972 916 1000 916 1002 900",
];

export const CutAlone: React.FC = () => {
  return (
    <Push from={1} to={1.07} cy={600}>
      {/* BG lines (BG線) */}
      <Drawing
        color={GRAPHITE_LIGHT}
        width={1.6}
        start={0}
        each={10}
        overlap={4}
        paths={[
          "M 160 908 L 1760 896",
          "M 700 1000 L 706 250",
          "M 720 1000 L 724 250",
          "M 712 258 C 730 214 790 206 834 226",
          "M 818 226 L 858 226 L 852 246 L 824 246 Z",
          "M 300 950 l 120 0 M 1320 940 l 160 0 M 1500 965 l 90 0",
        ]}
      />
      <Stroke d="M 826 250 L 560 990" color={RED} width={1.6} start={20} dur={10} dash="12 10" />
      <Stroke d="M 852 250 L 1470 990" color={RED} width={1.6} start={24} dur={10} dash="12 10" />
      <Rain />
      {/* the figure */}
      <Drawing paths={WOMAN_HAIR} start={6} each={8} overlap={5} width={2.8} rough={9} />
      <Drawing paths={WOMAN_BODY} start={22} each={7} overlap={4} width={2.6} rough={9} />
      <Drawing paths={WOMAN_LEGS} start={52} each={6} overlap={3} width={2.4} rough={7} />
      {/* shadows & highlight marks in colored pencil */}
      <Hatch
        id="w-shadow"
        clip="M 1002 520 L 1040 520 L 1050 800 L 990 812 Z"
        box={[980, 510, 80, 310]}
        start={64}
        dur={12}
      />
      <Hatch
        id="w-hair-shadow"
        clip="M 976 430 C 990 470 1010 490 1040 500 L 990 560 C 975 520 972 480 976 430 Z"
        box={[960, 420, 100, 150]}
        start={68}
        dur={10}
      />
      <Hatch
        id="w-floor"
        clip="M 880 905 C 900 930 1080 935 1130 912 C 1080 894 920 892 880 905 Z"
        box={[870, 885, 270, 60]}
        start={70}
        dur={10}
      />
      <Stroke d="M 940 384 C 932 400 930 420 932 440" color={RED} width={2} start={74} dur={8} />
      <Stroke d="M 890 520 C 886 560 884 600 882 640" color={RED} width={2} start={78} dur={8} />
    </Push>
  );
};

/* ---------- CUT 2: he walks away (with onion-skin ghosts) ---------- */

const man = (phase: number): string[] => {
  const p = Math.sin(phase);
  const lift = Math.abs(p) * 10;
  const sw = p * 16;
  return [
    "M -26 -485 C -26 -525 26 -525 26 -485 C 26 -447 -26 -447 -26 -485",
    "M -25 -478 C -14 -466 14 -466 25 -478",
    "M -22 -500 C -12 -508 10 -510 22 -498",
    "M -10 -452 l 0 12 M 10 -452 l 0 12",
    "M -12 -442 C -40 -440 -58 -432 -62 -410 L -66 -262",
    "M 12 -442 C 40 -440 58 -432 62 -410 L 66 -262",
    "M -66 -262 C -20 -256 20 -256 66 -262",
    "M -14 -444 C -6 -436 6 -436 14 -444",
    `M -62 -408 C -72 -360 ${-74 + sw} -300 ${-70 + sw} -256`,
    `M 62 -408 C 72 -360 ${74 - sw} -300 ${70 - sw} -256`,
    `M -24 -258 L ${-26 + p * 14} ${-8 - (p > 0 ? lift : 0)}`,
    `M -6 -258 L ${-10 + p * 14} ${-6 - (p > 0 ? lift : 0)}`,
    `M 6 -258 L ${8 - p * 14} ${-6 - (p < 0 ? lift : 0)}`,
    `M 24 -258 L ${26 - p * 14} ${-8 - (p < 0 ? lift : 0)}`,
  ];
};

export const CutLeaving: React.FC = () => {
  const step = useStepFrame();
  const { durationInFrames } = useVideoConfig();
  const pos = (f: number) => {
    const t = interpolate(f, [0, durationInFrames], [0, 1], {
      extrapolateRight: "clamp",
    });
    return {
      x: interpolate(t, [0, 1], [1180, 1430]),
      y: interpolate(t, [0, 1], [930, 800]),
      s: interpolate(t, [0, 1], [0.95, 0.42]),
      phase: (f / 6) * Math.PI * 0.5,
    };
  };
  const now = pos(step);
  const ghosts = [18, 9].map((d) => ({ d, ...pos(Math.max(0, step - d)) }));
  return (
    <>
      <Drawing
        color={GRAPHITE_LIGHT}
        width={1.6}
        paths={["M 160 790 L 1760 780", "M 1500 785 L 300 1000", "M 1500 785 L 1760 900"]}
      />
      {/* she, left, faint: the sheet underneath seen through the lightbox */}
      <g opacity={0.28} transform="translate(-500 -20)">
        <Drawing paths={[...WOMAN_HAIR, ...WOMAN_BODY, ...WOMAN_LEGS]} start={0} each={3} overlap={2} rough={8} />
      </g>
      {step > 12 &&
        ghosts.map((g, i) => (
          <g
            key={g.d}
            transform={`translate(${g.x} ${g.y}) scale(${g.s})`}
            opacity={0.35}
          >
            {man(g.phase).map((d, j) => (
              <path
                key={j}
                d={d}
                fill="none"
                stroke={i === 0 ? BLUE : RED}
                strokeWidth={2.2 / g.s}
                strokeLinecap="round"
              />
            ))}
          </g>
        ))}
      <g transform={`translate(${now.x} ${now.y}) scale(${now.s})`}>
        {man(now.phase).map((d, j) => (
          <path
            key={j}
            d={d}
            fill="none"
            stroke={GRAPHITE}
            strokeWidth={2.8 / now.s}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </g>
      {/* camera / direction marks */}
      <Stroke d="M 1150 330 C 1260 300 1360 300 1450 330" color={RED} width={2.4} start={10} dur={12} />
      <Stroke d="M 1430 312 L 1452 331 L 1426 344" color={RED} width={2.4} start={20} dur={5} />
    </>
  );
};

/* ---------- CUT 3: eye close-up, a tear ---------- */

export const CutEye: React.FC = () => {
  const step = useStepFrame();
  const tremble = (rand(Math.floor(step / 3)) - 0.5) * 6;
  const tear = interpolate(step, [44, 96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dropY = 650 + tear * 210;
  const EYE_OPEN =
    "M 560 542 C 650 402 1000 362 1340 470 C 1310 500 1300 530 1290 562 C 1080 670 760 660 640 600 C 600 580 575 560 560 542 Z";
  return (
    <Push from={1.02} to={1.12} cx={960} cy={520}>
      {/* sad brow: inner end lifted */}
      <Drawing
        width={4.4}
        each={10}
        overlap={4}
        rough={10}
        paths={[
          "M 1300 318 C 1100 262 820 250 600 300 C 580 296 566 286 556 270",
          "M 560 542 C 650 402 1000 362 1340 470",
          "M 1250 440 C 1300 456 1332 470 1362 494",
        ]}
      />
      {/* thick upper lid mass */}
      <Hatch
        id="lid-mass"
        clip="M 560 542 C 650 402 1000 362 1340 470 L 1336 486 C 1000 384 660 420 572 548 Z"
        box={[555, 360, 790, 200]}
        color={GRAPHITE}
        gap={3.5}
        start={10}
        dur={10}
        opacity={0.9}
      />
      <Drawing
        width={2.4}
        start={12}
        each={7}
        overlap={4}
        rough={8}
        paths={[
          "M 600 470 C 700 372 1000 332 1300 410",
          "M 640 600 C 760 660 1080 670 1290 562",
          "M 1336 474 C 1360 468 1380 452 1398 430",
          "M 1308 456 C 1336 440 1354 416 1366 392",
          "M 1270 440 C 1294 418 1306 392 1312 366",
          "M 1226 426 C 1244 404 1252 380 1254 356",
          "M 604 522 C 580 514 560 500 544 484",
          "M 1200 620 l 14 22 M 1150 640 l 8 22 M 1240 596 l 18 18",
        ]}
      />
      <clipPath id="eye-open">
        <path d={EYE_OPEN} />
      </clipPath>
      <g clipPath="url(#eye-open)">
        <g transform={`translate(${tremble} 0)`}>
          <Drawing
            width={2.8}
            start={24}
            each={8}
            overlap={3}
            paths={[
              "M 950 380 C 1040 380 1090 460 1088 530 C 1086 610 1030 672 950 672 C 870 672 814 610 812 530 C 810 460 860 380 950 380",
              "M 900 528 C 900 588 1000 592 1000 528 C 1000 476 900 476 900 528",
              "M 852 480 C 836 560 878 628 950 642",
            ]}
          />
          <Hatch
            id="iris-hatch"
            clip="M 812 530 C 810 460 860 380 950 380 C 1040 380 1090 460 1088 530 C 1000 480 900 480 812 530 Z"
            box={[810, 380, 280, 160]}
            color={GRAPHITE}
            gap={6}
            angle={60}
            start={34}
            dur={10}
            opacity={0.6}
          />
          <Stroke
            d="M 978 480 C 978 440 1042 440 1042 480 C 1042 520 978 520 978 480"
            color={RED}
            width={2.2}
            start={40}
            dur={8}
          />
          <Stroke
            d="M 876 600 C 876 584 904 584 904 600 C 904 616 876 616 876 600"
            color={RED}
            width={2.2}
            start={44}
            dur={6}
          />
        </g>
        <Hatch
          id="eye-shadow"
          clip="M 560 542 C 650 402 1000 362 1340 470 L 1320 522 C 1000 474 700 494 600 562 Z"
          box={[560, 380, 780, 190]}
          start={32}
          dur={14}
          gap={8}
        />
      </g>
      {/* tear welling on the lower lid, then falling */}
      <Stroke
        d="M 1060 646 C 1080 660 1110 660 1130 642"
        color={BLUE}
        width={2.4}
        start={36}
        dur={8}
      />
      {tear > 0 && (
        <g>
          <path
            d={`M 1100 652 C 1104 ${652 + (dropY - 652) * 0.4} 1096 ${652 + (dropY - 652) * 0.7} 1102 ${dropY}`}
            fill="none"
            stroke={BLUE}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <path
            d={`M 1102 ${dropY - 6} C 1084 ${dropY + 26} 1090 ${dropY + 50} 1102 ${dropY + 50} C 1114 ${dropY + 50} 1120 ${dropY + 26} 1102 ${dropY - 6}`}
            fill="none"
            stroke={BLUE}
            strokeWidth={2.6}
          />
        </g>
      )}
    </Push>
  );
};

/* ---------- CUT 4: the heart cracks, a thread to another heart ---------- */

const CRACK = "L 975 660 L 940 600 L 985 530 L 935 470 Z";
const LEFT_HALF =
  "M 960 400 C 900 300 720 320 730 470 C 740 600 900 680 960 760 " + CRACK;
const RIGHT_HALF =
  "M 960 400 C 1020 300 1200 320 1190 470 C 1180 600 1020 680 960 760 " +
  CRACK;
const HEART_OUTLINE =
  "M 960 400 C 900 300 720 320 730 470 C 740 600 900 680 960 760 C 1020 680 1180 600 1190 470 C 1200 320 1020 300 960 400 Z";

export const CutHeart: React.FC = () => {
  const step = useStepFrame();
  const split = interpolate(step, [50, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const whole = split === 0;
  return (
    <>
      <g transform={`translate(${-44 * split} ${12 * split}) rotate(${-8 * split} 960 760)`}>
        {whole ? (
          <Drawing paths={[HEART_OUTLINE]} color={RED} width={3.6} passes={3} each={22} rough={10} />
        ) : (
          <path d={LEFT_HALF} fill="none" stroke={RED} strokeWidth={3.6} strokeLinejoin="round" />
        )}
        <Hatch
          id="heart-hatch"
          clip={LEFT_HALF}
          box={[720, 300, 280, 470]}
          color={RED}
          start={16}
          dur={20}
          gap={11}
          opacity={0.45}
        />
      </g>
      {!whole && (
        <g transform={`translate(${44 * split} ${-6 * split}) rotate(${7 * split} 960 760)`}>
          <path d={RIGHT_HALF} fill="none" stroke={RED} strokeWidth={3.6} strokeLinejoin="round" />
        </g>
      )}
      {whole && (
        <Stroke
          d="M 960 400 L 935 470 L 985 530 L 940 600 L 975 660 L 960 760"
          color={GRAPHITE}
          width={3.4}
          start={28}
          dur={18}
        />
      )}
      {/* graphite dust falling out of the crack */}
      {!whole &&
        new Array(14).fill(0).map((_, i) => (
          <circle
            key={i}
            cx={950 + (rand(i) - 0.5) * 60}
            cy={560 + rand(i * 3) * 200 + split * (60 + rand(i * 5) * 120)}
            r={1.5 + rand(i * 7) * 2}
            fill={GRAPHITE}
            opacity={0.6 * (1 - split * 0.5)}
          />
        ))}
      {/* the other heart */}
      <Stroke
        d="M 1600 380 C 1585 352 1540 356 1543 392 C 1546 420 1585 438 1600 458 C 1615 438 1654 420 1657 392 C 1660 356 1615 352 1600 380 Z"
        color={GRAPHITE_LIGHT}
        width={2.2}
        start={62}
        dur={12}
      />
      <Stroke
        d={`M ${1150 + 44 * split} 470 C 1300 520 1420 360 1545 400`}
        color={GRAPHITE}
        width={1.6}
        start={72}
        dur={16}
        passes={1}
      />
    </>
  );
};
