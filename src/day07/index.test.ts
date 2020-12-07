import { part1, part2 } from ".";
import { getDayInput } from "../utils";

const finalInput = getDayInput(7);

describe("Day 7 - Part 1", () => {
  it("works with example input", () => {
    const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

    expect(part1(input)).toEqual(4);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(378);
  });
});

describe("Day 7 - Part 2", () => {
  it("works with part 1 input", () => {
    const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

    expect(part2(input)).toEqual(32);
  });

  it("works with example input", () => {
    const input = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

    expect(part2(input)).toEqual(126);
  });

  it("works with final input", () => {
    expect(part2(finalInput)).toEqual(27526);
  });
});
