import { part1, part2 } from "./index";
import { getDayInput } from "../utils";

const input = getDayInput(1);

describe("Day 1 - Part 1", () => {
  it("works with example input", () => {
    const input = [1721, 979, 366, 299, 675, 1456];

    expect(part1(input.join("\n"))).toEqual(514579);
  });

  it("works with final input", () => {
    expect(part1(input)).toEqual(870331);
  });
});

describe("Day 1 - Part 2", () => {
  it("works with example input", () => {
    const input = [1721, 979, 366, 299, 675, 1456];

    expect(part2(input.join("\n"))).toEqual(241861950);
  });

  it("works with final input", () => {
    expect(part2(input)).toEqual(283025088);
  });
});
