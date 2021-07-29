import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';

export default function NotActive() {
  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      bgcolor='#1D80C3'>
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: 'calc(100vh - 100px)', gap: 20 }}
        direction='column'>
        <Grid item>
          <Typography variant='h4' style={{ color: 'white' }}>
            We will contact you soon! Please be patient or call our hotline:
          </Typography>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 10 }}>
            <Typography variant='h4' style={{ fontWeight: 'bold' }}>
              0888888888
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
