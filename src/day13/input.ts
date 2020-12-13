type CRTInput = { rem: bigint; mod: bigint };

const parseInput = (input: string) => {
  const [departTimestamp, busIds] = input.split("\n");

  const parsedBusIds = busIds
    .split(",")
    .filter((id) => id !== "x")
    .map((id) => parseInt(id, 10));

  return {
    departTimestamp: parseInt(departTimestamp, 10),
    busIds: parsedBusIds,
  };
};

export const part1 = (input: string) => {
  const { departTimestamp, busIds } = parseInput(input);

  const { busId, busDepartTime } = busIds.reduce(
    (acc, busId) => {
      const busDepartTime = busId * Math.ceil(departTimestamp / busId);

      if (busDepartTime < acc.busDepartTime) {
        return { busId, busDepartTime };
      }

      return acc;
    },
    { busId: 0, busDepartTime: +Infinity }
  );

  return (busDepartTime - departTimestamp) * busId;
};

const mod = (x: number, y: number) => x - y * Math.floor(x / y);

const chineseRemainder = (arr: CRTInput[]) => {
  let sum = 0n;

  const prod = arr.reduce((acc, x) => acc * x.mod, 1n);

  for (const { rem, mod } of arr) {
    const p = prod / mod;
    sum += rem * mulInv(p, mod) * p;
  }

  return sum % prod;
};

const mulInv = (a: bigint, b: bigint) => {
  if (b === 1n) return 1n;

  const b0 = b;
  let x0 = 0n,
    x1 = 1n;

  while (a > 1n) {
    const q = a / b;
    [a, b] = [b, a % b];
    [x0, x1] = [x1 - q * x0, x0];
  }

  if (x1 < 0n) {
    x1 += b0;
  }

  return x1;
};

export const part2 = (input: string) => {
  const [_, busIds] = input.split("\n");

  const busIdsWithOffset = busIds
    .split(",")
    .map((id, i) =>
      id === "x"
        ? null
        : { mod: BigInt(id), rem: BigInt(mod(-i, parseInt(id, 10))) }
    )
    .filter((id) => id !== null) as CRTInput[];

  return chineseRemainder(busIdsWithOffset);
};
