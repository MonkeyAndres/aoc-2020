import { parseFormula, part1 } from ".";
import { getDayInput } from "../utils";

const finalInput = getDayInput(18);

describe("Day 18 - Utils", () => {
  describe("parseFormula()", () => {
    it("works with example input #1", () => {
      expect(parseFormula("1 + 2 * 3 + 4 * 5 + 6")).toEqual(71);
    });

    it("works with example input #1.5", () => {
      expect(parseFormula("(4 * (5 + 6))")).toEqual(44);
    });

    it("works with example input #2", () => {
      expect(parseFormula("1 + (2 * 3) + (4 * (5 + 6))")).toEqual(51);
    });

    it("works with example input #3", () => {
      expect(parseFormula("2 * 3 + (4 * 5)")).toEqual(26);
    });

    it("works with example input #4", () => {
      expect(parseFormula("5 + (8 * 3 + 9 + 3 * 4 * 3)")).toEqual(437);
    });

    it("works with example input #5", () => {
      expect(parseFormula("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")).toEqual(
        12240
      );
    });

    it("works with example input #5.1", () => {
      expect(parseFormula("((2 + 4 * 9) * (6 + 9))")).toEqual(810);
    });

    it("works with example input #5.2", () => {
      expect(parseFormula("((2 + 4 * 9) * (6 + 9) + 1)")).toEqual(811);
    });
  });
});

describe("Day 18 - Part 1", () => {
  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(8929569623593);
  });
});
