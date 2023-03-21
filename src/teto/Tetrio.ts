import * as t from "io-ts";

export const TetrioUser = t.type({
  _id: t.string,
  username: t.string,
});

export const TetrioPoints = t.type({
  primary: t.number,
  secondary: t.number,
  tertiary: t.number,
  extras: t.any,
});

export const EndContext = t.type({
  naturalorder: t.number,
  user: TetrioUser,
  active: t.boolean,
  wins: t.number,
  points: TetrioPoints,
  inputs: t.number,
  piecesplaced: t.number,
});

export const TetrioBoard = t.type({
  user: TetrioUser,
  active: t.boolean,
  success: t.boolean,
  winning: t.number,
});

export const BaseTetrioFrame = t.type({
  frame: t.number,
  type: t.string,
});

export const FullTetrioFrame = t.intersection([
  BaseTetrioFrame,
  t.type({
    type: t.literal("full"),
    data: t.type({
      successful: t.boolean,
      gameoverreason: t.any, // ?
      replay: t.any, // ?
      source: t.any, // ?
      options: t.any, // TODO
      stats: t.any, // TODO
      targets: t.array(t.any), // ?
      fire: t.number,
      game: t.any, // TODO
      killer: t.any, // ?
      aggregatestats: t.type({
        apm: t.number,
        pps: t.number,
        vsscore: t.number,
      }),
    }),
  }),
]);

export const StartTetrioFrame = t.intersection([
  BaseTetrioFrame,
  t.type({
    type: t.literal("start"),
    data: t.type({}),
  }),
]);

// ??? seems unimportant
export const TargetsTetrioFrame = t.intersection([
  BaseTetrioFrame,
  t.type({
    type: t.literal("targets"),
    data: t.any, // TODO
  }),
]);

export const TetrioKeyData = t.type({
  key: t.string,
  subframe: t.number,
});

export const KeydownTetrioFrame = t.intersection([
  BaseTetrioFrame,
  t.type({
    type: t.literal("keydown"),
    data: t.intersection([
      TetrioKeyData,
      t.partial({
        hoisted: t.boolean,
      }),
    ]),
  }),
]);

export const KeyupTetrioFrame = t.intersection([
  BaseTetrioFrame,
  t.type({
    type: t.literal("keyup"),
    data: TetrioKeyData, // TODO
  }),
]);

export const IgeTetrioFrame = t.intersection([
  BaseTetrioFrame,
  t.type({
    type: t.literal("ige"),
    data: t.type({
      id: t.number,
      frame: t.number,
      type: t.literal("ige"),
      data: t.any, // TODO
    }),
  }),
]);

export const EndTetrioFrame = t.intersection([
  BaseTetrioFrame,
  t.type({
    type: t.literal("end"),
    data: t.type({
      reason: t.union([
        t.literal("winner"),
        t.literal("garbagesmash"),
        t.literal("topout"),
      ]),
      export: t.any, // TODO
    }),
  }),
]);

export const TetrioReplayData = t.type({
  frames: t.number,
  events: t.array(
    t.union([
      FullTetrioFrame,
      StartTetrioFrame,
      TargetsTetrioFrame,
      KeydownTetrioFrame,
      KeyupTetrioFrame,
      IgeTetrioFrame,
      EndTetrioFrame,
    ])
  ),
});

export const TetrioRound = t.type({
  board: t.array(TetrioBoard),
  replays: t.array(TetrioReplayData),
});

export const TetrioReplay = t.type({
  ismulti: t.boolean,
  data: t.array(TetrioRound),
  endcontext: t.array(EndContext),
  ts: t.string,
});
