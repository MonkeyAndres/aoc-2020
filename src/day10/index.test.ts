import { part1, part2 } from ".";
import { getDayInput } from "../utils";

const exampleInput = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const finalInput = getDayInput(10);

describe("Day 10 - Part 1", () => {
  it("works with a simplified input", () => {
    const input = `16
10
15
5
1
11
7
19
6
12
4`;

    expect(part1(input)).toEqual(35);
  });

  it("works with example input", () => {
    expect(part1(exampleInput)).toEqual(220);
  });

  it("works with final input", () => {
    expect(part1(finalInput)).toEqual(2470);
  });
});

describe("Day 10 - Part 2", () => {
  it("works with a simplified input", () => {
    const input = `16
10
15
5
1
11
7
19
6
12
4`;

    expect(part2(input)).toEqual(8);
  });

  it("works with a example input", () => {
    expect(part2(exampleInput)).toEqual(19208);
  });

  it("works with a final input", () => {
    expect(part2(finalInput)).toEqual(1973822685184);
  });
});
