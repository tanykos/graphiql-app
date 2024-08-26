'use client';

import RouterLink from '@/components/RouterLink/RouterLink';
import { DictionaryContext } from '@/providers/dictionary-provider';
import {
  Box,
  Button,
  Input,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SignUp() {
  const dictionary = useContext(DictionaryContext);

  const [showPassword, setShowPassword] = useState(false);

  if (!dictionary) return;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Paper elevation={2} sx={{ padding: 4, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        {dictionary.signup.title}
      </Typography>
      <Box component="form" autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth id="user" label={dictionary.signup.username} type="text" variant="standard" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth id="email" label={dictionary.signup.email} type="email" variant="standard" />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="password">{dictionary.signup.password}</InputLabel>
              <Input
                size="small"
                id="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              {dictionary.signup.button}
            </Button>

            <Typography
              component="p"
              align="center"
              sx={{
                marginTop: 1.5,
              }}
            >
              {dictionary.signup.note}{' '}
              <RouterLink type="link" href="sign-in">
                {dictionary.signup.signin}
              </RouterLink>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
