import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function ScheduleNotification({ message }) {
  return (
    <Box bgcolor='white' borderRadius={5} p={1} clone>
      <Grid container justify='center'>
        <Typography variant='h6' style={{ color: 'black' }}>
          {message}
        </Typography>
      </Grid>
    </Box>
  );
}
