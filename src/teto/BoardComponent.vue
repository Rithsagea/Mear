<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Board, BlockColor, Block } from "./Board";

const props = defineProps<{
  board: Board;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  drawBoard();
});

const drawBoard = () => {
  let ctx = (canvasRef.value as HTMLCanvasElement).getContext("2d")!;
  let board = props.board;

  // clear canvas
  ctx.strokeStyle = "#000000";
  ctx.fillRect(0, 0, 200, 400);

  //draw grid
  ctx.strokeStyle = "#313131";
  for (let i = 0; i < board.height; i++) {
    for (let j = 0; j < board.width; j++) {
      ctx.strokeRect(j * 20, 380 - i * 20, 20, 20);
    }
  }

  // draw tiles
  for (let i = 0; i < board.height; i++) {
    for (let j = 0; j < board.width; j++) {
      if (board.data[i][j] == Block.EMPTY) continue;
      ctx.fillStyle = BlockColor.get(board.data[i][j]) ?? "#FFFFFF";
      ctx.fillRect(j * 20, 380 - i * 20, 20, 20);
    }
  }
};
</script>

<template>
  <div class="inline-block m-4">
    <canvas ref="canvasRef" width="200" height="400"> </canvas>
  </div>
</template>
