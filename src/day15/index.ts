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

export const part2 = (input: string) => {
  const startingNumbers = input.split(",");

  let lastSpokenNumber: number = parseInt(tail(startingNumbers));

  let cache: Map<number, [number, number] | [number]> = new Map();

  startingNumbers.forEach((n, i) => cache.set(+n, [i + 1]));

  for (let turn = startingNumbers.length; turn < 30000000; turn++) {
    const numberMem = cache.get(lastSpokenNumber);
    const currentTurn = turn + 1;

    if (numberMem?.length === 2) {
      lastSpokenNumber = numberMem[1] - numberMem[0];
    } else {
      lastSpokenNumber = 0;
    }

    let currentSpokenAt = cache.get(lastSpokenNumber);

    if (!currentSpokenAt) {
      cache.set(lastSpokenNumber, [currentTurn]);
    } else if (currentSpokenAt.length === 1) {
      ((currentSpokenAt as unknown) as [number, number])[1] = currentTurn;
    } else {
      currentSpokenAt[0] = currentSpokenAt[1];
      currentSpokenAt[1] = currentTurn;
    }
  }

  return lastSpokenNumber;
};
