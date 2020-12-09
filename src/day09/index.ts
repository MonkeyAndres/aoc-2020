import * as day1 from "../day01";

export const part1 = (input: string, preample: number): number => {
  const parsedInput = input.split("\n").map(Number);

  for (let i = preample; i < parsedInput.length - 1; i++) {
    const previousNumbers = parsedInput.slice(i - preample, i);

    try {
      day1.part1(previousNumbers.join("\n"), parsedInput[i]);
    } catch (err) {
      return parsedInput[i];
    }
  }

  throw new Error("The sequence is valid");
};

export const part2 = (input: string, preample: number) => {
  const parsedInput = input.split("\n").map(Number);
  const invalidNumber = part1(input, preample);

  for (let i = 0; i < parsedInput.length - 1; i++) {
    let sum = invalidNumber - parsedInput[i];

    for (let j = i + 1; j < parsedInput.length - 1; j++) {
      sum -= parsedInput[j];

      if (sum === 0) {
        const range = parsedInput.slice(i, j);

        return Math.min(...range) + Math.max(...range);
      } else if (sum > 0) {
        continue;
      } else if (sum < 0) {
        break;
      }
    }
  }

  throw new Error("The encryption has no weakness");
};
