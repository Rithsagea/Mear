export const Block = {
  EMPTY: 0,
  CYAN: 1, // I
  ORANGE: 2, // L
  YELLOW: 3, // O
  RED: 4, // Z
  PURPLE: 5, // T
  BLUE: 6, // J
  GREEN: 7, // S
  GRAY: 8,
  //TODO solid garbage
};

export const BlockColor = new Map<number, string>([
  [Block.EMPTY, "#000000"],
  [Block.CYAN, "#0f9bd7"],
  [Block.ORANGE, "#e35b02"],
  [Block.YELLOW, "#e39f02"],
  [Block.RED, "#d70f37"],
  [Block.PURPLE, "#af298a"],
  [Block.BLUE, "#2141c6"],
  [Block.GREEN, "#59b101"],
  [Block.GRAY, "#6a6a6a"],
  //TODO solid garbage
]);

/*
20x10 tetris board, just 2D array
[row][column]

row 0 is the bottom
row 19 is the top

column 0 is the left
column 9 is the right
*/

export class Board {
  data: number[][];
  height: number;
  width: number;

  constructor(height: number = 20, width: number = 10) {
    this.height = height;
    this.width = width;

    this.data = new Array(height);
    for (let i = 0; i < height; i++) {
      this.data[i] = new Array(width);
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.data[i][j] = Math.floor(Math.random() * 9);
      }
    }
  }
}
