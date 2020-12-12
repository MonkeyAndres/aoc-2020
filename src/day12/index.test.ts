import { part1, part2 } from ".";
import { getDayInput } from "../utils";

const exampleInput = `F10
N3
F7
R90
F11`;

const finalInput = getDayInput(12);

describe("Day 12 - Part 1", () => {
  it("works with example input", () => {
    expect(part1(exampleInput)).toEqual(25);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(420);
  });
});

describe("Day 12 - Part 2", () => {
  it("works with example input", () => {
    expect(part2(exampleInput)).toEqual(286);
  });

  it("works with final input", () => {
    expect(part2(finalInput)).toEqual(42073);
  });
});
