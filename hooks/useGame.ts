import { useCallback, useState } from 'react';
import { createEmptyBoard, addRandomTile, moveBoard, canMoveBoard, hasWon } from '../utils/game';

export default function useGame(defaultSize = 4) {
  const init = (size: number) => {
    let b = createEmptyBoard(size);
    b = addRandomTile(b);
    b = addRandomTile(b);
    return b;
  };

  const [size, setSize] = useState<number>(defaultSize);
  const [board, setBoard] = useState<number[][]>(() => init(defaultSize));
  const [score, setScore] = useState<number>(0);
  const [youWin, setYouWin] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [stepHistory, setStepHistory] = useState<number[][][]>([init(defaultSize)]);

  const restart = useCallback((newSize = size) => {
    const b = init(newSize);
    setSize(newSize);
    setBoard(b);
    setScore(0);
    setYouWin(false);
    setGameOver(false);
    setStepHistory([b]);
  }, []);

  const move = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    setBoard((prev) => {
      const { board: next, moved, gained } = moveBoard(prev, dir);
      if (!moved) return prev;
      // add random tile immutably
      const withTile = addRandomTile(next);
      setScore((s) => s + gained);
      setStepHistory((h) => [...h, withTile]);
      if (hasWon(withTile)) setYouWin(true);
      if (!canMoveBoard(withTile)) setGameOver(true);
      return withTile;
    });
  }, []);

  const canMove = canMoveBoard(board);

  return {
    board,
    score,
    size,
    setSize,
    move,
    restart,
    canMove,
    gameOver,
    youWin,
    stepHistory
  };
}
