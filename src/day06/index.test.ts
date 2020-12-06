import { part1, part2 } from ".";
import { getDayInput } from "../utils";

const input = getDayInput(6);

describe("Day 6 - Part 1", () => {
  it("works with example input", () => {
    const input = `abc

a
b
c

ab
ac

a
a
a
a

b`;

    expect(part1(input)).toEqual(11);
  });

  it("works with final input", () => {
    expect(part1(input)).toEqual(6161);
  });
});

describe("Day 6 - Part 2", () => {
  it("works with example input", () => {
    const input = `abc

a
b
c

ab
ac

a
a
a
a

b`;

    expect(part2(input)).toEqual(6);
  });

  it("works with final input", () => {
    expect(part2(input)).toEqual(2971);
  });
});
