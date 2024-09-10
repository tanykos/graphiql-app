'use client';

import styles from './main-page.module.scss';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { useContext } from 'react';
import RouterLink from '@/components/RouterLink/RouterLink';
import { Avatar, Box, Paper, Stack, Grid, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { Routes } from '@/constants/routes';
import withAuth from '@/hoc/withAuth';

interface MainPageProps {
  user: User | null;
}

function MainPage({ user }: MainPageProps) {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  return (
    <Grid container>
      <Grid item xs={12} sx={{ wordBreak: 'break-all' }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mt: 4 }}>
          {dictionary.main.title}
          {user ? `, ${user.displayName}` : ``}!
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
          {user ? (
            <>
              <RouterLink type="button" href={Routes.RESTFUL_CLIENT} variantBtn="contained">
                {dictionary.restClient}
              </RouterLink>
              <RouterLink type="button" href={Routes.GRAPHQL_CLIENT} variantBtn="contained">
                {dictionary.graphClient}
              </RouterLink>
              <RouterLink type="button" href={Routes.HISTORY} variantBtn="outlined">
                {dictionary.history}
              </RouterLink>
            </>
          ) : (
            <>
              <RouterLink type="button" href={Routes.SIGN_IN} variantBtn="contained">
                {dictionary.main.signin}
              </RouterLink>
              <RouterLink type="button" href={Routes.SIGN_UP} variantBtn="contained">
                {dictionary.main.signup}
              </RouterLink>
            </>
          )}
        </Box>
      </Grid>

      <Grid item className={styles.info} xs={12} sx={{ textAlign: 'center', ml: 6, mr: 6 }}>
        <Grid container sx={{ justifyContent: 'center' }} spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper className={styles.paper} elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {dictionary.main.aboutProject}
              </Typography>
              <Typography variant="body1">{dictionary.main.projectDescription}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} md={5}>
            <Paper className={styles.paper} elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {dictionary.main.aboutCourse}
              </Typography>
              <Typography variant="body1">{dictionary.main.courseDescription}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={5}>
            <Paper className={styles.paper} elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {dictionary.main.developers}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-around' }}>
                <Box className={styles.developer}>
                  <Avatar alt={dictionary.main.devSurname1} sx={{ width: 56, height: 56 }} />
                  <Typography>
                    {dictionary.main.nameTatyana}
                    <br />
                    {dictionary.main.devSurname1}
                  </Typography>
                </Box>
                <Box className={styles.developer}>
                  <Avatar alt={dictionary.main.devSurname2} sx={{ width: 56, height: 56 }} />
                  <Typography>
                    {dictionary.main.nameArtyom}
                    <br />
                    {dictionary.main.devSurname2}
                  </Typography>
                </Box>
                <Box className={styles.developer}>
                  <Avatar alt={dictionary.main.devSurname3} src="/avatar-tk.jpg" sx={{ width: 56, height: 56 }} />
                  <Typography>
                    {dictionary.main.nameTatyana}
                    <br />
                    {dictionary.main.devSurname3}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withAuth(MainPage);
