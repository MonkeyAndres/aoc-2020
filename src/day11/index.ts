type Board = string[][];

enum SeatStatuses {
  EMPTY = "L",
  OCCUPIED = "#",
  FLOOR = ".",
}

type SeatPosition = [number, number];

type Vector = [number, number];

const ADJACENT_VECTORS: Vector[] = [
  [-1, -1],
  [-1, 0],
  [-1, +1],
  [0, +1],
  [+1, +1],
  [+1, 0],
  [+1, -1],
  [0, -1],
];

const safeGetSeat = (board: Board, seatPosition: SeatPosition) => {
  try {
    const [row, column] = seatPosition;

    return board[row][column];
  } catch (err) {
    return null;
  }
};

const countOccupiedSeats = (
  board: Board,
  seatPosition: SeatPosition,
  checkVectors: Vector[]
): number => {
  let count = 0;
  const [row, column] = seatPosition;

  for (let [v1, v2] of checkVectors) {
    const seatStatus = safeGetSeat(board, [row + v1, column + v2]);

    if (seatStatus === SeatStatuses.OCCUPIED) {
      count += 1;
    }
  }

  return count;
};

export const part1 = (input: string) => {
  let currentBoard: Board = input.split("\n").map((row) => row.split(""));

  let nextBoard: Board = [];
  let hadChanges = true;

  while (hadChanges) {
    hadChanges = false;

    for (let row = 0; row < currentBoard.length; row++) {
      const nextRow = [];

      for (let column = 0; column < currentBoard[0].length; column++) {
        const occupiedSeats = countOccupiedSeats(
          currentBoard,
          [row, column],
          ADJACENT_VECTORS
        );
        const currentStatus = currentBoard[row][column];

        if (occupiedSeats === 0 && currentStatus === SeatStatuses.EMPTY) {
          hadChanges = true;
          nextRow.push(SeatStatuses.OCCUPIED);
        } else if (
          occupiedSeats >= 4 &&
          currentStatus === SeatStatuses.OCCUPIED
        ) {
          hadChanges = true;
          nextRow.push(SeatStatuses.EMPTY);
        } else {
          nextRow.push(currentStatus);
        }
      }

      nextBoard.push(nextRow);
    }

    currentBoard = nextBoard;
    nextBoard = [];
  }

  return currentBoard
    .flat()
    .reduce((acc, seat) => (seat === SeatStatuses.OCCUPIED ? acc + 1 : acc), 0);
};

const countVisibleOccupiedSeats = (
  board: Board,
  seatPosition: SeatPosition,
  checkVectors: Vector[]
) => {
  let count = 0;
  const [row, column] = seatPosition;

  for (let [v1, v2] of checkVectors) {
    const checkingPosition: Vector = [row + v1, column + v2];
    const seatStatus = safeGetSeat(board, checkingPosition);

    if (seatStatus === SeatStatuses.OCCUPIED) {
      count += 1;
    } else if (seatStatus === SeatStatuses.FLOOR) {
      count += countVisibleOccupiedSeats(board, checkingPosition, [[v1, v2]]);
    }
  }

  return count;
};

export const part2 = (input: string) => {
  let currentBoard: Board = input.split("\n").map((row) => row.split(""));

  let nextBoard: Board = [];
  let hadChanges = true;

  while (hadChanges) {
    hadChanges = false;

    for (let row = 0; row < currentBoard.length; row++) {
      const nextRow = [];

      for (let column = 0; column < currentBoard[0].length; column++) {
        const occupiedSeats = countVisibleOccupiedSeats(
          currentBoard,
          [row, column],
          ADJACENT_VECTORS
        );
        const currentStatus = currentBoard[row][column];

        if (occupiedSeats === 0 && currentStatus === SeatStatuses.EMPTY) {
          hadChanges = true;
          nextRow.push(SeatStatuses.OCCUPIED);
        } else if (
          occupiedSeats >= 5 &&
          currentStatus === SeatStatuses.OCCUPIED
        ) {
          hadChanges = true;
          nextRow.push(SeatStatuses.EMPTY);
        } else {
          nextRow.push(currentStatus);
        }
      }

      nextBoard.push(nextRow);
    }

    currentBoard = nextBoard;
    nextBoard = [];
  }

  return currentBoard
    .flat()
    .reduce((acc, seat) => (seat === SeatStatuses.OCCUPIED ? acc + 1 : acc), 0);
};
