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

class Round {
  constructor(raw: any) {
    console.log(raw);
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

    this.rounds = raw.data.map((round: any) => new Round(round));
  }
}
