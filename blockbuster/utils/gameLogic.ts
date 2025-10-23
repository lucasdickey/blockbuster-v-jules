export const PIECES = [
  // L
  [[1, 0], [1, 0], [1, 1]],
  // T
  [[1, 1, 1], [0, 1, 0]],
  // Square
  [[1, 1], [1, 1]],
  // Line
  [[1, 1, 1, 1]],
  // Z
  [[1, 1, 0], [0, 1, 1]],
];

export const getRandomPiece = () => {
  const pieceIndex = Math.floor(Math.random() * PIECES.length);
  return PIECES[pieceIndex];
};

export const rotatePiece = (piece: number[][]) => {
  const rows = piece.length;
  const cols = piece[0].length;
  const newPiece = Array(cols).fill(null).map(() => Array(rows).fill(0));
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      newPiece[col][rows - 1 - row] = piece[row][col];
    }
  }
  return newPiece;
};

const transpose = (board: number[][]) => {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
};

export const clearCompletedLines = (board: number[][]) => {
  // Clear rows
  let newBoard = board.filter(row => row.some(cell => cell === 0));
  const clearedRows = 8 - newBoard.length;
  while (newBoard.length < 8) {
    newBoard.unshift(Array(8).fill(0));
  }

  // Clear columns
  let transposedBoard = transpose(newBoard);
  transposedBoard = transposedBoard.filter(row => row.some(cell => cell === 0));
  const clearedCols = 8 - transposedBoard.length;
  while (transposedBoard.length < 8) {
    transposedBoard.unshift(Array(8).fill(0));
  }
  newBoard = transpose(transposedBoard);

  return { newBoard, clearedLines: clearedRows + clearedCols };
};
