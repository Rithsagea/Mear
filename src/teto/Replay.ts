export class ReplayLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReplayLoadError";
  }
}

class PlayerInfo {
  id: string;
  username: string;

  constructor(raw: any) {
    this.id = raw.user._id;
    this.username = raw.user.username;
  }
}

class EventData {}

class HandlingOptions {
  gameOptions: any;
  controlOptions: any;

  constructor(raw: any) {
    this.gameOptions = raw.options;
    this.controlOptions = raw.game.handling;

    console.log(this);
  }
}

function parseEventData(raw: any): [EventData[], HandlingOptions] {
  let framesCount = raw.frames;
  let handlingOptions: HandlingOptions;
  let events: EventData[] = [];

  for (let event of raw.events) {
    switch (event.type) {
      case "full": // this goes into handlingoptions
        handlingOptions = new HandlingOptions(event.data);
      case "keydown":
      case "keyup":
      case "ige":
      case "end":

      case "targets": // this probably doesn't matter
      case "start": // this also probably doesn't matter
        break;
      default:
        throw new ReplayLoadError(`unknown event type: ${event.type}`);
    }
  }

  return [events, handlingOptions!];
}

class Round {
  player1Frames: EventData[];
  player2Frames: EventData[];

  player1Handling: HandlingOptions;
  player2Handling: HandlingOptions;

  constructor(raw: any) {
    console.log(raw);

    [this.player1Frames, this.player1Handling] = parseEventData(raw.replays[0]);
    [this.player2Frames, this.player2Handling] = parseEventData(raw.replays[1]);
  }
}

export class Replay {
  player1: PlayerInfo;
  player2: PlayerInfo;

  rounds: Round[];

  constructor(raw: any) {
    if (raw.endcontext.length != 2)
      throw new ReplayLoadError("player count not exactly 2");

    raw.endcontext.forEach((endcontext: any) => {
      if (endcontext.naturalorder === 0)
        this.player1 = new PlayerInfo(endcontext);
      else if (endcontext.naturalorder === 1)
        this.player2 = new PlayerInfo(endcontext);
      else throw new ReplayLoadError("invalid player order in endcontext");
    });

    this.rounds = raw.data.slice(0, 1).map((round: any) => new Round(round));
  }
}
