'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { useContext } from 'react';
import RouterLink from '@/components/RouterLink/RouterLink';
import { Box, Grid, Typography } from '@mui/material';

export default function MainPage() {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant="h3">{dictionary.main.title}</Typography>
      </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            mt: 2,
            '& > :not(first-child)': {
              ml: 2,
            },
          }}
        >
          <RouterLink type="button" href="sign-in" variantBtn="outlined">
            {dictionary.main.signin}
          </RouterLink>
          <RouterLink type="button" href="sign-up" variantBtn="outlined">
            {dictionary.main.signup}
          </RouterLink>
        </Box>
      </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4">{dictionary.main.section}</Typography>
        <Typography variant="h5">Coming soon...</Typography>
      </Grid>
    </Grid>
  );
}
