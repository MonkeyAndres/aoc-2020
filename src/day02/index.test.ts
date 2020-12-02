import { getDayInput } from "../utils";
import { part1, part2 } from "./index";

const input = getDayInput(2);

describe("Day 2 - Part 1", () => {
  it("works with example input", () => {
    const input = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

    expect(part1(input)).toEqual(2);
  });

  it("works with final input", () => {
    expect(part1(input)).toEqual(622);
  });
});

describe("Day 2 - Part 2", () => {
  it("works with example input", () => {
    const input = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

    expect(part2(input)).toEqual(1);
  });

  it("works with final input", () => {
    expect(part2(input)).toEqual(263);
  });
});
