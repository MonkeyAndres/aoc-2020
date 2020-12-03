import { type } from "os";

export type SlopeVector = number[];

type MapPattern = string[][];

export const part1 = (input: string, slopeVector: SlopeVector) => {
  const mapPattern: MapPattern = input.split("\n").map((row) => row.split(""));
  const rowsLength = mapPattern[0].length - 1;

  let nextY = slopeVector[1];
  let nextX = slopeVector[0];
  let encounteredTrees = 0;

  while (true) {
    if (nextY >= mapPattern.length) {
      return encounteredTrees;
    }

    if (nextX > rowsLength) {
      nextX -= Math.trunc(nextX / rowsLength) * rowsLength + 1;
    }

    if (mapPattern[nextY][nextX] === "#") {
      encounteredTrees += 1;
    }

    nextY += slopeVector[1];
    nextX += slopeVector[0];
  }
};

export const part2 = (input: string, slopeVectors: SlopeVector[]) =>
  slopeVectors.reduce((acc, vector) => acc * part1(input, vector), 1);
