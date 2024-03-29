import { part1, part2 } from ".";
import { getDayInput } from "../utils";

const finalInput = getDayInput(15);

describe("Day 15 - Part 1", () => {
  it("works with example input #0", () => {
    expect(part1("0,3,6")).toEqual(436);
  });

  it("works with example input #1", () => {
    expect(part1("1,3,2")).toEqual(1);
  });

  it("works with example input #2", () => {
    expect(part1("2,1,3")).toEqual(10);
  });

  it("works with example input #3", () => {
    expect(part1("1,2,3")).toEqual(27);
  });

  it("works with example input #4", () => {
    expect(part1("2,3,1")).toEqual(78);
  });

  it("works with example input #5", () => {
    expect(part1("3,2,1")).toEqual(438);
  });

  it("works with example input #6", () => {
    expect(part1("3,1,2")).toEqual(1836);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(371);
  });
});

// Skipped some test for better performance while running day solutions
describe("Day 15 - Part 2", () => {
  it.skip("works with example input #0", () => {
    expect(part2("0,3,6")).toEqual(175594);
  });

  it.skip("works with example input #1", () => {
    expect(part2("1,3,2")).toEqual(2578);
  });

  it.skip("works with example input #2", () => {
    expect(part2("2,1,3")).toEqual(3544142);
  });

  it.skip("works with example input #3", () => {
    expect(part2("1,2,3")).toEqual(261214);
  });

  it.skip("works with example input #4", () => {
    expect(part2("2,3,1")).toEqual(6895259);
  });

  it.skip("works with example input #5", () => {
    expect(part2("3,2,1")).toEqual(18);
  });

  it.skip("works with example input #6", () => {
    expect(part2("3,1,2")).toEqual(362);
  });

  it("works with final input", () => {
    expect(part2(finalInput)).toEqual(352);
  });
});
