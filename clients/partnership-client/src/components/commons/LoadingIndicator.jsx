import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function LoadingIndicator() {
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
          <CircularProgress style={{ color: 'white' }} />
        </Grid>
        <Grid item>
          <Typography style={{ color: 'white' }}>Loading...</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
