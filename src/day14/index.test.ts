import { part1, part2 } from ".";
import { getDayInput } from "../utils";

const finalInput = getDayInput(14);

describe("Day 14 - Part 1", () => {
  it("works with example input", () => {
    const exampleInput = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

    expect(part1(exampleInput)).toEqual(165);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(10035335144067);
  });
});

describe("Day 14 - Part 2", () => {
  it("works with example input", () => {
    const exampleInput = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

    expect(part2(exampleInput)).toEqual(208);
  });

  it("works with final input", () => {
    expect(part2(finalInput)).toEqual(3817372618036);
  });
});
