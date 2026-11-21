import { pose } from "./rig";

/** Pose library. All poses face "forward" (+x); `facing` flips them. */
export const P = {
  stand: pose({}),
  standHeavy: pose({ lean: 6, neck: 12, head: 10, nSh: -1, fSh: 2, nEl: 4, fEl: 6 }),

  sitChair: pose({
    ground: 0, lean: -4, neck: 8, head: 6,
    nHip: 86, nKnee: 84, nFoot: 0, fHip: 82, fKnee: 80, fFoot: 0,
    nSh: 26, nEl: 52, nWr: 6, fSh: 22, fEl: 56, fWr: 6,
  }),
  sitChairForward: pose({
    ground: 0, lean: 16, neck: 10, head: 4,
    nHip: 86, nKnee: 84, fHip: 82, fKnee: 80,
    nSh: 32, nEl: 48, nWr: 10, fSh: 28, fEl: 52, fWr: 10,
  }),

  /** one open palm resting on glass at face height */
  palm: pose({
    lean: 5, neck: 6, head: 4,
    nSh: 104, nEl: 32, nWr: 46,
    fSh: 6, fEl: 12,
  }),
  palmSlipping: pose({
    lean: 3, neck: 18, head: 14,
    nSh: 78, nEl: 20, nWr: 60,
    fSh: 2, fEl: 8,
  }),
  handsDropped: pose({ lean: 3, neck: 16, head: 12, nSh: 8, nEl: 12, fSh: 4, fEl: 10 }),

  /** both palms on the glass, head bowed between the arms */
  bothPalms: pose({
    lean: 12, neck: 18, head: 22,
    nSh: 118, nEl: 24, nWr: 40,
    fSh: 124, fEl: 18, fWr: 40,
    nHip: -4, fHip: 6,
  }),

  /** sitting on the floor, back to the glass, knees up, forearms on knees */
  sitFloor: pose({
    ground: 0, lean: -12, neck: 26, head: 26,
    nHip: 142, nKnee: 132, nFoot: 10, fHip: 134, fKnee: 122, fFoot: 8,
    nSh: 60, nEl: 50, nWr: 20, fSh: 54, fEl: 56, fWr: 20,
  }),
  crouch: pose({
    ground: 1, lean: 30, neck: 10, head: 8,
    nHip: 80, nKnee: 120, fHip: 70, fKnee: 110,
    nSh: 40, nEl: 30, fSh: 30, fEl: 30,
  }),

  /** reach for a wall switch at shoulder-top height */
  reachSwitch: pose({ lean: 2, neck: 2, head: -4, nSh: 112, nEl: 8, nWr: 10, fSh: 4, fEl: 10 }),

  // ---- woman ----
  fixHair: pose({
    lean: 0, neck: -2, head: -6,
    nSh: 150, nEl: 112, nWr: 30,
    fSh: 6, fEl: 14, nHip: 2, fHip: -4,
  }),
  holdCup: pose({ lean: 1, neck: 4, head: 2, nSh: 8, nEl: 96, nWr: 4, fSh: 2, fEl: 8 }),
  sip: pose({ lean: -2, neck: -4, head: -12, nSh: 10, nEl: 150, nWr: 10, fSh: 2, fEl: 8 }),
  reachTable: pose({ lean: 14, neck: 6, head: 8, nSh: 52, nEl: 18, nWr: 10, fSh: 2, fEl: 8 }),
  warm: pose({ lean: 4, neck: -2, head: -8, nSh: 30, nEl: 70, nWr: 10, fSh: 22, fEl: 30 }),
  shock: pose({ lean: -6, neck: -6, head: -6, nSh: 14, nEl: 40, fSh: 10, fEl: 30, nHip: -6, fHip: 6 }),
  raiseHand: pose({ lean: 2, neck: 2, head: 0, nSh: 98, nEl: 26, nWr: 56, fSh: 4, fEl: 10 }),
  palmReflection: pose({ lean: 4, neck: 10, head: 10, nSh: 104, nEl: 30, nWr: 46, fSh: 3, fEl: 8 }),
  lonely: pose({ lean: 4, neck: 16, head: 14, nSh: 104, nEl: 26, nWr: 50, fSh: 2, fEl: 8 }),
};
