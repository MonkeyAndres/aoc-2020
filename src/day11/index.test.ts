import { part1 } from ".";
import { getDayInput } from "../utils";

const exampleInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const finalInput = getDayInput(11);

describe("Day 11 - Part 1", () => {
  it("works with example input", () => {
    expect(part1(exampleInput)).toEqual(37);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(2329);
  });
});
