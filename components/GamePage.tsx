import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import Board from "../components/Board";
import Controls from "../components/Controls";
import useGame from "../hooks/useGame";

export default function Home() {
  const {
    board,
    score,
    size,
    setSize,
    move,
    restart,
    canMove,
    gameOver,
    youWin,
  } = useGame(4);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") move("left");
      if (e.key === "ArrowRight") move("right");
      if (e.key === "ArrowUp") move("up");
      if (e.key === "ArrowDown") move("down");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">2048 Game</Typography>
          <Box textAlign="right">
            <Typography variant="subtitle1">Score</Typography>
            <Typography variant="h6">{score}</Typography>
          </Box>
        </Box>

        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <TextField
            label="Board size"
            type="number"
            inputProps={{ min: 3, max: 8 }}
            value={size}
            onChange={(e) => {
              const v = Math.max(3, Math.min(8, Number(e.target.value) || 4));
              setSize(v);
            }}
            size="small"
          />
          <Button variant="contained" onClick={() => restart(size)}>
            Restart
          </Button>
        </Box>

        <Board
          board={board}
          youWin={youWin}
          gameOver={gameOver}
          restart={restart}
        />

        <Box mt={2}>
          <Controls onMove={move} disabled={!canMove || gameOver || youWin} />
        </Box>

        <Box mt={2}>
          {youWin && (
            <Typography color="primary">You reached 2048! 🎉</Typography>
          )}
          {gameOver && (
            <Typography color="error">Game Over - no moves left.</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
