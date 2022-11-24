const DESIRED_SUM = 2020;

export const part1 = (input: string, desiredNumber = DESIRED_SUM) => {
  const expenses = input.split("\n").map(Number);

  for (let i = 0; i <= expenses.length - 1; i++) {
    const targetValue = desiredNumber - expenses[i];
    const targetIndex = expenses.indexOf(targetValue);

    if (targetIndex > 0 && targetIndex !== i) {
      return targetValue * expenses[i];
    }
  }

  throw new Error(`Cannot get ${DESIRED_SUM} by adding 2 expenses.`);
};

const ignoreThrow = <T extends Function>(fn: T) => {
  try {
    return fn()
  } catch (error) {}
}

export const part2 = (input: string) => {
  const expenses = input.split("\n").map(Number);

  for (let i = 0; i <= expenses.length - 1; i++) {
    const targetValue = DESIRED_SUM - expenses[i];

    for (let j = 0; j <= expenses.length - 1; j++) {
      const res = ignoreThrow(() => part1(input, targetValue));

      if (typeof res === "number") {
        return res * expenses[i];
      }
    }
  }

  throw new Error(`Cannot get ${DESIRED_SUM} by adding 3 expenses.`);
};
