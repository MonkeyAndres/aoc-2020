type Range = [number, number];

const parsePredicates = (input: string[]): Range[][] => {
  const predicates: Range[][] = [];

  for (let line of input) {
    const matches = line.match(
      /[a-z ]+: (\d{1,3})-(\d{1,3}) or (\d{1,3})-(\d{1,3})/
    );

    if (!matches) {
      return predicates;
    }

    const [_, min1, max1, min2, max2] = matches;
    predicates.push([
      [parseInt(min1, 10), parseInt(max1, 10)],
      [parseInt(min2, 10), parseInt(max2, 10)],
    ]);
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
  const predicates = parsePredicates(parsedInput).flat();
  const nearbyTickets = getNearbyTickets(parsedInput).flat();

  let errorRate = 0;

  for (let ticket of nearbyTickets) {
    if (!isInRanges(ticket, predicates)) {
      errorRate += ticket;
    }
  }

  return errorRate;
};

const getMyTicket = (input: string) => {
  const matches = input.match(/your ticket:\n([\d,]+)/);

  if (!matches) {
    throw new Error("Cannot find your ticket");
  }

  return matches[1].split(",").map((value) => parseInt(value, 10));
};

const transpose = (list: any[][]): any[][] =>
  list[0].map((_, colIndex) => list.map((row) => row[colIndex]));

export const part2 = (input: string) => {
  const parsedInput = input.split("\n");
  const predicates = parsePredicates(parsedInput);
  const myTicket = getMyTicket(input);

  // Filter invalid tickets
  const flatPredicates = predicates.flat();
  const nearbyTickets = getNearbyTickets(parsedInput).filter(
    (ticket) => !ticket.some((n) => !isInRanges(n, flatPredicates))
  );

  // Validate which rows meet each predicate
  const transposedTickets: number[][] = transpose(nearbyTickets);
  const predicateToValidRows: { [k: number]: string[] } = {};

  for (let predicateIndex in predicates) {
    for (let row in transposedTickets) {
      if (
        transposedTickets[row].every((item) =>
          isInRanges(item, predicates[predicateIndex])
        )
      ) {
        if (predicateToValidRows[predicateIndex]) {
          predicateToValidRows[predicateIndex].push(row);
        } else {
          predicateToValidRows[predicateIndex] = [row];
        }
      }
    }
  }

  // Order rows by length and filter them to obtain {predicate: row}
  const predicatesByRowLength: { [k: number]: number } = Object.entries(
    predicateToValidRows
  )
    .sort(([, p1], [, p2]) => p1.length - p2.length)
    .reduce((acc, [pred, rows], i, obj) => {
      const intPred = parseInt(pred, 10);

      if (i === 0) {
        acc[intPred] = parseInt(rows[0], 10);
        return acc;
      }

      const prevRows = obj[i - 1][1];
      const rowValue = rows.filter((row) => !prevRows.includes(row))[0];

      acc[intPred] = parseInt(rowValue, 10);

      return acc;
    }, {} as { [k: number]: number });

  // Accumulate the result (only for first six predicates)
  let result = 1;

  for (let i = 0; i < 6; i++) {
    const ticketEntry = myTicket[predicatesByRowLength[i]];

    // Needed for example case
    if (!ticketEntry) {
      return result;
    }

    result *= myTicket[predicatesByRowLength[i]];
  }

  return result;
};
