import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import FlightBanner from './FlightBanner';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    gap: 40,
  },
});

export default function FlightHome() {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction='column'>
      <Grid item>
        <FlightBanner />
      </Grid>
    </Grid>
  );
}
