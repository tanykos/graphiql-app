'use client';

import styles from './main-page.module.scss';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { useContext } from 'react';
import RouterLink from '@/components/RouterLink/RouterLink';
import { Avatar, Box, Paper, Stack, Grid, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { Routes } from '@/constants/routes';
import withAuth from '@/hoc/withAuth';
import { ButtonsTypes } from '@/const';

interface MainPageProps {
  user: User | null;
}

function MainPage({ user }: MainPageProps) {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const pageButtons = user
    ? [
        { href: Routes.RESTFUL_CLIENT, text: dictionary.restClient, variant: ButtonsTypes.CONTAINED },
        { href: Routes.GRAPHQL_CLIENT, text: dictionary.graphClient, variant: ButtonsTypes.CONTAINED },
        { href: Routes.HISTORY, text: dictionary.history, variant: ButtonsTypes.OUTLINED },
      ]
    : [
        { href: Routes.SIGN_IN, text: dictionary.main.signin, variant: ButtonsTypes.CONTAINED },
        { href: Routes.SIGN_UP, text: dictionary.main.signup, variant: ButtonsTypes.CONTAINED },
      ];

  const developers = [
    { name: dictionary.main.nameTatyana, surname: dictionary.main.surnameTanyaT, src: '/avatar-tt.png' },
    { name: dictionary.main.nameArtyom, surname: dictionary.main.surnameArtyom, src: '/avatar-ap.png' },
    { name: dictionary.main.nameTatyana, surname: dictionary.main.surnameTanyaK, src: '/avatar-tk.jpg' },
  ];

  return (
    <Grid container>
      <Grid item xs={12} sx={{ wordBreak: 'break-word' }}>
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
          {pageButtons.map(({ href, text, variant }, index) => (
            <RouterLink key={index} type="button" href={href} variantBtn={variant}>
              {text}
            </RouterLink>
          ))}
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
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                className={styles['developers-wrap']}
                sx={{ width: '100%', justifyContent: 'space-around' }}
              >
                {developers.map((developer, index) => (
                  <Box key={index} className={styles.developer}>
                    <Avatar alt={developer.surname} src={developer.src} sx={{ width: 56, height: 56 }} />
                    <Typography>
                      {developer.name}
                      <br />
                      {developer.surname}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withAuth(MainPage);
