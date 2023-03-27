<script setup lang="ts">
import { Board } from "./Board";
import { Replay } from "./Replay";
import BoardComponent from "./BoardComponent.vue";
import replayData from "./game.json";

var board1: Board = Board.fromFumen(
  "v115@ufAtHeBtEeQ4BeAtRpDeR4xhRpEeQ4xhRphlh0Aegl?xhRpAtglg0BeglxhCtglh0AehlwhglT4Aeh0xhhlAtRpAei?0whCtRpAeRpg0CtywAeRpwhRpT4Aeg0glwhJeAgH"
);

var board2: Board = Board.fromFumen(
  "v115@AgwhIewhIe0hDeQ4whglRph0CeR4glRpg0BtCeQ4hl?whg0CtAehlRpwhBtDeglh0whhlwwR4Aewhg0ywglRpBewhg?0Bti0R4AewhJeAgH"
);

let replay = new Replay(replayData);
</script>

<template>
  <div class="flex text-center">
    <div>
      <h1>
        <a :href="`https://ch.tetr.io/u/${replay.player1.id}`">
          {{ replay.player1.username }}
        </a>
      </h1>
      <BoardComponent :board="board1" />
    </div>

    <div>
      <h1>
        <a :href="`https://ch.tetr.io/u/${replay.player2.id}`">
          {{ replay.player2.username }}
        </a>
      </h1>
      <BoardComponent :board="board2" />
    </div>
  </div>
</template>
