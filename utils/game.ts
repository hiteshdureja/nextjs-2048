export type Board = number[][];

//create empty board
export function createEmptyBoard(size: number): Board {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function copyBoard(board: Board): Board {
  return board.map((row) => row.slice());
}

//get list of empty positions
export function emptyPositions(board: Board): [number, number][] {
  const res: [number, number][] = [];
  board.forEach((row, r) =>
    row.forEach((v, c) => {
      if (v === 0) res.push([r, c]);
    })
  );
  return res;
}

//add random 2 or 4 tile
export function addRandomTile(board: Board): Board {
  const empties = emptyPositions(board);
  if (empties.length === 0) return board;
  const idx = Math.floor(Math.random() * empties.length);
  const [r, c] = empties[idx];
  const val = Math.random() < 0.9 ? 2 : 4;
  const nb = copyBoard(board);
  nb[r][c] = val;
  return nb;
}

//compress a single row
function compressRow(row: number[]): number[] {
  const filtered = row.filter((x) => x !== 0);
  const zeros = Array(row.length - filtered.length).fill(0);
  return [...filtered, ...zeros];
}

// merge a row
function mergeRow(row: number[]): [number[], number] {
  const res = row.slice();
  let gained = 0;
  for (let i = 0; i < res.length - 1; i += 1) {
    if (res[i] !== 0 && res[i] === res[i + 1]) {
      res[i] = res[i] * 2;
      res[i + 1] = 0;
      gained += res[i];
    }
  }
  return [res, gained];
}

// helper: rotate board clockwise n times
function rotate(board: Board, times: number): Board {
  let b = copyBoard(board);
  for (let t = 0; t < ((times % 4) + 4) % 4; t++) {
    const size = b.length;
    const nb = createEmptyBoard(size);
    for (let r = 0; r < size; r++)
      for (let c = 0; c < size; c++) nb[c][size - 1 - r] = b[r][c];
    b = nb;
  }
  return b;
}

export function moveBoard(board: Board, dir: "left" | "right" | "up" | "down") {
  const map: Record<typeof dir, number> = { left: 0, up: 3, right: 2, down: 1 };
  const times = map[dir];
  let b = rotate(board, times);
  const size = b.length;
  let moved = false;
  let totalGained = 0;
  const newBoard = b.map((row) => {
    let r = compressRow(row);
    const [merged, gained] = mergeRow(r);
    totalGained += gained;
    r = compressRow(merged);
    if (!moved && r.some((val, idx) => val !== row[idx])) moved = true;
    return r;
  });
  const result = rotate(newBoard, 4 - (times % 4));
  return { board: result, moved, gained: totalGained };
}

export function canMoveBoard(board: Board): boolean {
  const size = board.length;
  if (emptyPositions(board).length > 0) return true;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const v = board[r][c];
      if (r + 1 < size && board[r + 1][c] === v) return true;
      if (c + 1 < size && board[r][c + 1] === v) return true;
    }
  }
  return false;
}

export function hasWon(board: Board, target = 2048): boolean {
  return board.some((row) => row.some((v) => v >= target));
}
