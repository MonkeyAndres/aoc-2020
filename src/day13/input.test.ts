import { getDayInput } from "../utils";
import { part1, part2 } from "./input";

const exampleInput = `939
7,13,x,x,59,x,31,19`;

const finalInput = getDayInput(13);

describe("Day 13 - Part 1", () => {
  it("works with example input", () => {
    expect(part1(exampleInput)).toEqual(295);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(3269);
  });
});

describe("Day 13 - Part 2", () => {
  it("works with example input", () => {
    expect(part2(exampleInput)).toEqual(1068781n);
  });

  it("works with part2 example #1", () => {
    expect(part2("\n17,x,13,19")).toEqual(3417n);
  });

  it("works with part2 example #2", () => {
    expect(part2("\n67,7,59,61")).toEqual(754018n);
  });

  it("works with part2 example #3", () => {
    expect(part2("\n67,x,7,59,61")).toEqual(779210n);
  });

  it("works with part2 example #4", () => {
    expect(part2("\n1789,37,47,1889")).toEqual(1202161486n);
  });

  it("works with final input", () => {
    expect(part2(finalInput)).toEqual(672754131923874n);
  });
});
