import { Box, Grid, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';

export default function ServerError() {
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
          <WarningIcon style={{ color: 'yellow' }} fontSize='large' />
        </Grid>
        <Grid item>
          <Typography variant='h5' style={{ color: 'white' }}>
            Server is being maintained! Please try again in another time!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
