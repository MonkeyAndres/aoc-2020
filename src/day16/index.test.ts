import { part1 } from ".";
import { getDayInput } from "../utils";

const exampleInput = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

const finalInput = getDayInput(16);

describe("Day 16 - Part 1", () => {
  it("works with example input", () => {
    expect(part1(exampleInput)).toEqual(71);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(27911);
  });
});
