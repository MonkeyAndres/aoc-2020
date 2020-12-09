import { part1, part2 } from ".";
import { getDayInput } from "../utils";

const exampleInput = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

const finalInput = getDayInput(9);

describe("Day 9 - Part 1", () => {
  it("works with example input", () => {
    expect(part1(exampleInput, 5)).toEqual(127);
  });

  it("works with final input", () => {
    expect(part1(finalInput, 25)).toEqual(375054920);
  });
});

describe("Day 9 - Part 2", () => {
  it("works with example input", () => {
    expect(part2(exampleInput, 5)).toEqual(62);
  });

  it("works with final input", () => {
    expect(part2(finalInput, 25)).toEqual(54142584);
  });
});
