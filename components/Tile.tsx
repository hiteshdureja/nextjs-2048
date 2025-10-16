import React from 'react';
import { Box, Typography } from '@mui/material';

const colors: Record<string, string> = {
  '0': '#cdc1b4',
  '2': '#eee4da',
  '4': '#ede0c8',
  '8': '#f2b179',
  '16': '#f59563',
  '32': '#f67c5f',
  '64': '#f65e3b',
  '128': '#edcf72',
  '256': '#edcc61',
  '512': '#edc850',
  '1024': '#edc53f',
  '2048': '#edc22e',
};

export default function Tile({ value, size }: { value: number; size: number }) {
  const text = value === 0 ? '' : String(value);
  const bg = colors[String(value)] ?? '#3c3a32';
  const color = value <= 4 ? '#776e65' : '#f9f6f2';

  // Adjust font size based on tile size
  const fontSize = size / 3.5;

  return (
    <Box
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bg,
        boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.03)',
      }}
    >
      {text && (
        <Typography variant="h6" sx={{ fontWeight: 700, color, fontSize }}>
          {text}
        </Typography>
      )}
    </Box>
  );
}
