type GameCache = {
  [k: string]: [number, number] | [number];
};

const tail = (arr: any[]) => arr[arr.length - 1];

export const part1 = (input: string) => {
  const startingNumbers = input.split(",");

  let lastSpokenNumber: number = parseInt(tail(startingNumbers));

  const cache: GameCache = startingNumbers.reduce(
    (acc, n, i) => ({ ...acc, [n]: [i + 1] }),
    {}
  );

  for (let turn = startingNumbers.length; turn < 2020; turn++) {
    const numberMem = cache[lastSpokenNumber];
    const currentTurn = turn + 1;

    if (numberMem?.length === 2) {
      lastSpokenNumber = numberMem[1] - numberMem[0];
    } else {
      lastSpokenNumber = 0;
    }

    cache[lastSpokenNumber] = cache[lastSpokenNumber]
      ? [tail(cache[lastSpokenNumber]), currentTurn]
      : [currentTurn];
  }

  return lastSpokenNumber;
};
