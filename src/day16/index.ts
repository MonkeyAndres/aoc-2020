type Range = [number, number];

const parsePredicates = (input: string[]): Range[] => {
  const predicates: Range[] = [];

  for (let line of input) {
    const matches = line.match(
      /[a-z ]+: (\d{1,3})-(\d{1,3}) or (\d{1,3})-(\d{1,3})/
    );

    if (!matches) {
      return predicates;
    }

    const [_, min1, max1, min2, max2] = matches;
    predicates.push(
      [parseInt(min1, 10), parseInt(max1, 10)],
      [parseInt(min2, 10), parseInt(max2, 10)]
    );
  }

  return predicates;
};

const getNearbyTickets = (input: string[]) => {
  const index = input.indexOf("nearby tickets:");

  return input
    .slice(index + 1)
    .map((ticket) => ticket.split(",").map((value) => parseInt(value, 10)));
};

const isInRanges = (value: number, ranges: Range[]) => {
  for (let range of ranges) {
    if (value >= range[0] && value <= range[1]) {
      return true;
    }
  }

  return false;
};

export const part1 = (input: string) => {
  const parsedInput = input.split("\n");
  const predicates = parsePredicates(parsedInput);
  const nearbyTickets = getNearbyTickets(parsedInput).flat();

  let errorRate = 0;

  for (let ticket of nearbyTickets) {
    if (!isInRanges(ticket, predicates)) {
      errorRate += ticket;
    }
  }

  return errorRate;
};
