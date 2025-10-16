import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Tile from "./Tile";

type BoardProps = {
  board: number[][];
  youWin?: boolean;
  gameOver?: boolean;
  restart?: (size?: number) => void;
};

export default function Board({
  board,
  youWin,
  gameOver,
  restart,
}: BoardProps) {
  const size = board.length;
  const boardWidth = 400;
  const gap = 8;
  const tileSize = (boardWidth - (size + 1) * gap) / size;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        background: "#bbada0",
        borderRadius: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
          gridTemplateRows: `repeat(${size}, ${tileSize}px)`,
          gap: `${gap}px`,
          width: `${boardWidth}px`,
          height: `${boardWidth}px`,
          padding: `${gap}px`,
          borderRadius: 2,
          position: "relative",
        }}
      >
        {board.flatMap((row, r) =>
          row.map((val, c) => (
            <Tile key={`${r}-${c}`} value={val} size={tileSize} />
          ))
        )}

        {(youWin || gameOver) && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: 2,
              backgroundColor: youWin
                ? "rgba(0, 200, 0, 0.6)"
                : "rgba(255, 0, 0, 0.6)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              zIndex: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
              }}
            >
              {youWin ? "You Win! 🎉" : "Game Over 💀"}
            </Typography>

            {restart && (
              <Button
                variant="contained"
                color="inherit"
                onClick={() => restart(size)}
                sx={{
                  fontWeight: "bold",
                  color: youWin ? "#2e7d32" : "#d32f2f",
                  background: "#fff",
                  "&:hover": {
                    background: "#f5f5f5",
                  },
                }}
              >
                Play Again
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
