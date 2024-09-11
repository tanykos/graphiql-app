'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { useContext } from 'react';
import RouterLink from '@/components/RouterLink/RouterLink';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { Routes } from '@/constants/routes';
import { UserContext } from '@/providers/user-provider';

function MainPage() {
  const dictionary = useContext(DictionaryContext);

  const userContext = useContext(UserContext);
  const { user } = userContext!;

  if (!dictionary) return;

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ wordBreak: 'break-all' }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mt: 4 }}>
          {dictionary.main.title}
          {user?.isLogged ? `, ${user.displayName}` : ``}!
        </Typography>
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
          {user?.isLogged ? (
            <>
              <RouterLink type="button" href={Routes.RESTFUL_CLIENT} variantBtn="outlined">
                {dictionary.restClient}
              </RouterLink>
              <RouterLink type="button" href={Routes.GRAPHQL_CLIENT} variantBtn="outlined">
                {dictionary.graphClient}
              </RouterLink>
              <RouterLink type="button" href={Routes.HISTORY} variantBtn="outlined">
                {dictionary.history}
              </RouterLink>
            </>
          ) : (
            <>
              <RouterLink type="button" href={Routes.SIGN_IN} variantBtn="outlined">
                {dictionary.main.signin}
              </RouterLink>
              <RouterLink type="button" href={Routes.SIGN_UP} variantBtn="outlined">
                {dictionary.main.signup}
              </RouterLink>
            </>
          )}
        </Box>
      </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4">{dictionary.main.section}</Typography>
        <Typography variant="h5">Coming soon...</Typography>
      </Grid>
    </Grid>
  );
}

export default MainPage;
