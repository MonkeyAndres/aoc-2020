type Board = string[][];

enum SeatStatuses {
  EMPTY = "L",
  OCCUPIED = "#",
  FLOOR = ".",
}

const safeGetSeat = (board: Board, row: number, column: number) => {
  try {
    return board[row][column];
  } catch (err) {
    return false;
  }
};

const countAdjacentOccupiedSeats = (
  board: Board,
  row: number,
  column: number
): number => {
  let count = 0;

  if (safeGetSeat(board, row - 1, column - 1) === SeatStatuses.OCCUPIED) {
    count += 1;
  }

  if (safeGetSeat(board, row - 1, column) === SeatStatuses.OCCUPIED) {
    count += 1;
  }

  if (safeGetSeat(board, row - 1, column + 1) === SeatStatuses.OCCUPIED) {
    count += 1;
  }

  if (safeGetSeat(board, row, column + 1) === SeatStatuses.OCCUPIED) {
    count += 1;
  }

  if (safeGetSeat(board, row + 1, column + 1) === SeatStatuses.OCCUPIED) {
    count += 1;
  }

  if (safeGetSeat(board, row + 1, column) === SeatStatuses.OCCUPIED) {
    count += 1;
  }

  if (safeGetSeat(board, row + 1, column - 1) === SeatStatuses.OCCUPIED) {
    count += 1;
  }

  if (safeGetSeat(board, row, column - 1) === SeatStatuses.OCCUPIED) {
    count += 1;
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
        const occupiedSeats = countAdjacentOccupiedSeats(
          currentBoard,
          row,
          column
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
