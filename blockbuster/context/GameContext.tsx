import React, { createContext, useState } from 'react';
import { getRandomPiece, clearCompletedLines } from '../utils/gameLogic';
import { initialBoard, initialPieces } from '../utils/boardPresets';

type GameState = {
  board: number[][];
  pieces: number[][][];
  score: number;
};

type GameContextType = {
  gameState: GameState;
  placePiece: (piece: number[][], row: number, col: number, pieceIndex: number) => void;
  startNewGame: () => void;
};

const GameContext = createContext<GameContextType | null>(null);

const initialGameState = {
  board: initialBoard,
  pieces: initialPieces,
  score: 0,
};

export const GameProvider: React.FC = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const placePiece = (piece: number[][], row: number, col: number, pieceIndex: number) => {
    const newBoard = gameState.board.map(r => [...r]);
    for (let r = 0; r < piece.length; r++) {
      for (let c = 0; c < piece[0].length; c++) {
        if (piece[r][c]) {
          newBoard[row + r][col + c] = 1;
        }
      }
    }

    const { newBoard: clearedBoard, clearedLines } = clearCompletedLines(newBoard);
    const newScore = gameState.score + (clearedLines * 10) * clearedLines;

    let newPieces = gameState.pieces.filter((_, index) => index !== pieceIndex);
    if (newPieces.length === 0) {
      newPieces = [getRandomPiece(), getRandomPiece(), getRandomPiece()];
    }

    setGameState({
      board: clearedBoard,
      pieces: newPieces,
      score: newScore,
    });
  };

  const startNewGame = () => {
    setGameState(initialGameState);
  };

  return (
    <GameContext.Provider value={{ gameState, placePiece, startNewGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
