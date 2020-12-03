export type SlopeVector = [number, number];

type MapPattern = string[][];

const TREE = "#";

export const part1 = (input: string, slopeVector: SlopeVector): number => {
  const mapPattern: MapPattern = input.split("\n").map((row) => row.split(""));
  const rowsLength = mapPattern[0].length;

  let [nextX, nextY] = slopeVector;
  let encounteredTrees = 0;

  while (nextY < mapPattern.length) {
    if (mapPattern[nextY][nextX] === TREE) {
      encounteredTrees += 1;
    }

    nextY += slopeVector[1];
    nextX = (nextX + slopeVector[0]) % rowsLength;
  }

  return encounteredTrees;
};

export const part2 = (input: string, slopeVectors: SlopeVector[]): number =>
  slopeVectors.reduce((acc, vector) => acc * part1(input, vector), 1);
