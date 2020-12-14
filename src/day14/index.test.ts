import { part1 } from ".";
import { getDayInput } from "../utils";

const exampleInput = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

const finalInput = getDayInput(14);

describe("Day 14 - Part 1", () => {
  it("works with example input", () => {
    expect(part1(exampleInput)).toEqual(165);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(10035335144067);
  });
});
