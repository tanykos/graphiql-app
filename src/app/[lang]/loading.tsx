import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}
