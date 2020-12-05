type Seat = [number, number];

type SeatRange = {
  row: [number, number];
  column: [number, number];
};

enum BoardingPassIndications {
  F = "F",
  B = "B",
  R = "R",
  L = "L",
}

const PLANE_ROWS = 128;
const PLANE_COLUMNS = 8;

const getSeatFromRange = ({ row, column }: SeatRange) => {
  const seat: Seat = [0, 0];

  if (row[0] === row[1]) {
    seat[0] = row[0];
  } else {
    throw new Error(`Rows ${row[0]} and ${row[1]} are different`);
  }

  if (column[0] === column[1]) {
    seat[1] = column[0];
  } else {
    throw new Error(`Columns ${column[0]} and ${column[1]} are different`);
  }

  return seat;
};

export const decodeBoardingPass = (passCode: string): Seat => {
  const seatIndications = passCode.split("") as BoardingPassIndications[];

  const initialValue: SeatRange = {
    row: [0, PLANE_ROWS - 1],
    column: [0, PLANE_COLUMNS - 1],
  };

  const { row, column } = seatIndications.reduce(
    ({ row, column }, indication): SeatRange => {
      const [minRow, maxRow] = row;
      const [minColumn, maxColumn] = column;

      const middleRow = Math.round((maxRow - minRow) / 2);
      const middleColumn = Math.round((maxColumn - minColumn) / 2);

      if (indication === BoardingPassIndications.F) {
        return { column, row: [minRow, maxRow - middleRow] };
      }

      if (indication === BoardingPassIndications.B) {
        return { column, row: [minRow + middleRow, maxRow] };
      }

      if (indication === BoardingPassIndications.L) {
        return { row, column: [minColumn, maxColumn - middleColumn] };
      }

      if (indication === BoardingPassIndications.R) {
        return { row, column: [minColumn + middleColumn, maxColumn] };
      }

      return { row, column };
    },
    initialValue
  );

  return getSeatFromRange({ row, column });
};

export const calculateSeatId = ([row, column]: Seat) =>
  row * PLANE_COLUMNS + column;

const findGreaterSeatId = (acc: number, seatId: number) =>
  acc < seatId ? seatId : acc;

export const part1 = (input: string): number =>
  input
    .split("\n")
    .map(decodeBoardingPass)
    .map(calculateSeatId)
    .reduce(findGreaterSeatId, -Infinity);

export const part2 = (input: string): number => {
  const allSeatIds = input
    .split("\n")
    .map(decodeBoardingPass)
    .map(calculateSeatId);

  const greaterSeatId = allSeatIds.reduce(findGreaterSeatId, -Infinity);

  for (
    let seatPointer = PLANE_COLUMNS;
    seatPointer <= greaterSeatId;
    seatPointer++
  ) {
    if (!allSeatIds.includes(seatPointer)) {
      return seatPointer;
    }
  }

  throw new Error("All seats are filled");
};
