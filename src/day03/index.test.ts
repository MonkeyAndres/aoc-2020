import { part1, part2, SlopeVector } from ".";
import { getDayInput } from "../utils";

const input = getDayInput(3);

describe("Day 3 - Part 1", () => {
  const SLOPE_VECTOR: SlopeVector = [3, 1];

  it("works with example input", () => {
    const exampleInput = [
      "..##.......",
      "#...#...#..",
      ".#....#..#.",
      "..#.#...#.#",
      ".#...##..#.",
      "..#.##.....",
      ".#.#.#....#",
      ".#........#",
      "#.##...#...",
      "#...##....#",
      ".#..#...#.#",
    ];

    expect(part1(exampleInput.join("\n"), SLOPE_VECTOR)).toEqual(7);
  });

  it("works with final input", () => {
    expect(part1(input, SLOPE_VECTOR)).toEqual(195);
  });
});

describe("Day 3 - Part 2", () => {
  const slopeVectors: SlopeVector[] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  it("works with example input", () => {
    const exampleInput = [
      "..##.......",
      "#...#...#..",
      ".#....#..#.",
      "..#.#...#.#",
      ".#...##..#.",
      "..#.##.....",
      ".#.#.#....#",
      ".#........#",
      "#.##...#...",
      "#...##....#",
      ".#..#...#.#",
    ];

    expect(part2(exampleInput.join("\n"), slopeVectors)).toEqual(336);
  });

  it("works with final input", () => {
    expect(part2(input, slopeVectors)).toEqual(3772314000);
  });
});
