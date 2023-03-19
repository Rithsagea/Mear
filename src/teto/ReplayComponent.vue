<script setup lang="ts">
import BoardComponent from "./BoardComponent.vue";
import { Board } from "./Board";

var board1: Board = Board.fromFumen(
  "v115@ufAtHeBtEeQ4BeAtRpDeR4xhRpEeQ4xhRphlh0Aegl?xhRpAtglg0BeglxhCtglh0AehlwhglT4Aeh0xhhlAtRpAei?0whCtRpAeRpg0CtywAeRpwhRpT4Aeg0glwhJeAgH"
);

var board2: Board = Board.fromFumen(
  "v115@AgwhIewhIe0hDeQ4whglRph0CeR4glRpg0BtCeQ4hl?whg0CtAehlRpwhBtDeglh0whhlwwR4Aewhg0ywglRpBewhg?0Bti0R4AewhJeAgH"
);
</script>

<template>
  <div>
    <BoardComponent :board="board1" />
    <BoardComponent :board="board2" />
  </div>
</template>
