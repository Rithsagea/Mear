<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Board, BlockColor } from "./teto/Board";

onMounted(() => {
  drawBoard();
});

const drawBoard = () => {
  let ctx = (document.getElementById("board") as HTMLCanvasElement).getContext(
    "2d"
  )!;
  var board: Board = Board.fromFumen("v115@ufAtHeBtEeQ4BeAtRpDeR4xhRpEeQ4xhRphlh0Aegl?xhRpAtglg0BeglxhCtglh0AehlwhglT4Aeh0xhhlAtRpAei?0whCtRpAeRpg0CtywAeRpwhRpT4Aeg0glwhJeAgH");

  // clear canvas
  ctx.strokeStyle = "#000000";
  ctx.fillRect(0, 0, 200, 400);

  for (let i = 0; i < board.height; i++) {
    for (let j = 0; j < board.width; j++) {
      ctx.fillStyle = BlockColor.get(board.data[i][j]) ?? "#FFFFFF";
      console.log(ctx.fillStyle);
      ctx.fillRect(j * 20, 380 - i * 20, 20, 20);
    }
  }
};
</script>

<template>
  <canvas id="board" width="200" height="400"> </canvas>
</template>
