import { decodeBoardingPass, calculateSeatId, part1, part2 } from ".";
import { getDayInput } from "../utils";

const input = getDayInput(5);

describe("Day 5 - Utils", () => {
  describe("decodeBoardingPass()", () => {
    it("decodes some border passes", () => {
      expect(decodeBoardingPass("FBFBBFFRLR")).toEqual([44, 5]);
      expect(decodeBoardingPass("BFFFBBFRRR")).toEqual([70, 7]);
      expect(decodeBoardingPass("FFFBBBFRRR")).toEqual([14, 7]);
      expect(decodeBoardingPass("BBFFBBFRLL")).toEqual([102, 4]);
    });
  });

  describe("calculateSeatId()", () => {
    it("calculates some seatIds", () => {
      expect(calculateSeatId(decodeBoardingPass("FBFBBFFRLR"))).toEqual(357);
      expect(calculateSeatId(decodeBoardingPass("BFFFBBFRRR"))).toEqual(567);
      expect(calculateSeatId(decodeBoardingPass("FFFBBBFRRR"))).toEqual(119);
      expect(calculateSeatId(decodeBoardingPass("BBFFBBFRLL"))).toEqual(820);
    });
  });
});

describe("Day 5 - Part 1", () => {
  it("works with example input", () => {
    const input = `FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

    expect(part1(input)).toEqual(820);
  });

  it("works with final input", () => {
    expect(part1(input)).toEqual(976);
  });
});

describe("Day 5 - Part 2", () => {
  it("works with final input", () => {
    expect(part2(input)).toEqual(685);
  });
});
