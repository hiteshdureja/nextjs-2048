import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Controls({ onMove, disabled }: { onMove: (dir: 'up'|'down'|'left'|'right') => void, disabled?: boolean }) {
  return (
    <Box display="flex" justifyContent="center">
      <Stack direction="column" spacing={1} alignItems="center">
        <IconButton onClick={() => onMove('up')} disabled={disabled}><ArrowUpwardIcon /></IconButton>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => onMove('left')} disabled={disabled}><ArrowBackIcon /></IconButton>
          <IconButton onClick={() => onMove('right')} disabled={disabled}><ArrowForwardIcon /></IconButton>
        </Stack>
        <IconButton onClick={() => onMove('down')} disabled={disabled}><ArrowDownwardIcon /></IconButton>
      </Stack>
    </Box>
  );
}
