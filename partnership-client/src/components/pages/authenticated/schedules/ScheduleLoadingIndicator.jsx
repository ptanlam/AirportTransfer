import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';

export default function ScheduleLoadingIndicator() {
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      direction='column'
      style={{ height: 'calc(100% - 50px)' }}>
      <Grid item>
        <CircularProgress style={{ color: 'white' }} />
      </Grid>
    </Grid>
  );
}
