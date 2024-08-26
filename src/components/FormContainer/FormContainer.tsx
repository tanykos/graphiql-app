import { Paper, Box, Grid, Typography, Button } from '@mui/material';
import { ReactNode } from 'react';
import { FormLink } from '../FormLink/FormLink';
import { fieldsFormData } from '@/types';

interface FormContainerProps {
  data: fieldsFormData;
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function FormContainer({ data, children, onSubmit }: FormContainerProps) {
  return (
    <Paper elevation={2} sx={{ padding: 4, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        {data.title}
      </Typography>
      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {children}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              {data.buttonText}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormLink note={data.note} linkText={data.linkText} href={data.href} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
