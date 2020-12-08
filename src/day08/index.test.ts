import { part1, part2 } from ".";
import { getDayInput } from "../utils";

const exampleInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const finalInput = getDayInput(8);

describe("Day 8 - Part 1", () => {
  it("works with example input", () => {
    expect(part1(exampleInput)).toEqual(5);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(1684);
  });
});

describe("Day 8 - Part 2", () => {
  it("works with example input", () => {
    expect(part2(exampleInput)).toEqual(8);
  });

  it("works with final input", () => {
    expect(part2(finalInput)).toEqual(2188);
  });
});
