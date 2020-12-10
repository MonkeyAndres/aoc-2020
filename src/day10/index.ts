const parseJolts = (jolts: string): number[] => {
  const parsedJolts: number[] = jolts
    .split("\n")
    .map((val) => parseInt(val, 10))
    .concat(0)
    .sort((a, b) => a - b);

  parsedJolts.push(parsedJolts[parsedJolts.length - 1] + 3);

  return parsedJolts;
};

export const part1 = (input: string): number => {
  const jolts: number[] = parseJolts(input);

  let differencesBy1 = 0;
  let differencesBy3 = 0;

  for (let i = 0; i < jolts.length - 1; i++) {
    const currentJolt = jolts[i];
    const nextJolt = jolts[i + 1];

    if (currentJolt + 1 === nextJolt) {
      differencesBy1 += 1;
      continue;
    }

    if (currentJolt + 3 === nextJolt) {
      differencesBy3 += 1;
      continue;
    }

    throw new Error(`Cannot get next jolt of ${currentJolt}`);
  }

  return differencesBy1 * differencesBy3;
};

export const part2 = (input: string): number => {
  const jolts: number[] = parseJolts(input);

  const memory = {};

  return countJoltCombinations(jolts, 0, memory);
};

const countJoltCombinations = (
  jolts: number[],
  pointer: number,
  memory: { [k: number]: number }
): number => {
  let counter = 0;
  const currentJolt = jolts[pointer];

  if (memory[pointer]) {
    return memory[pointer];
  }

  if (currentJolt === jolts[jolts.length - 1]) {
    return 1;
  }

  if (jolts.includes(currentJolt + 1)) {
    counter += countJoltCombinations(
      jolts,
      jolts.indexOf(currentJolt + 1),
      memory
    );
  }

  if (jolts.includes(currentJolt + 2)) {
    counter += countJoltCombinations(
      jolts,
      jolts.indexOf(currentJolt + 2),
      memory
    );
  }

  if (jolts.includes(currentJolt + 3)) {
    counter += countJoltCombinations(
      jolts,
      jolts.indexOf(currentJolt + 3),
      memory
    );
  }

  memory[pointer] = counter;
  return counter;
};
