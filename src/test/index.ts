import { readFileSync } from "fs";
import { Replay, ReplayLoadError } from "./Replay";

let data = readFileSync("./cz.ttrm", "utf8");

try {
  let replay = Replay.fromRaw(JSON.parse(data));
} catch (e) {
  if (e instanceof ReplayLoadError) {
    console.error(`Error loading replay: ${e.message}`);
  }
}
