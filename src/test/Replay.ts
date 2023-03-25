export class ReplayLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReplayLoadError";
  }
}

export class Replay {
  static fromRaw(raw: any) {
    let replay = new Replay();

    if(raw.endcontext.length != 2) throw new ReplayLoadError("player count not exactly 2");

    console.log(raw.endcontext);
    return replay;
  }
}
