import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles({
  root: {
    padding: 20,
    width: '100%',
  },
});

export default function CardSkeleton() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Skeleton variant='rect' />
        </Grid>
        <Grid item>
          <Skeleton variant='rect' />
        </Grid>
        <Grid item>
          <Skeleton variant='rect' />
        </Grid>
        <Grid item>
          <Skeleton variant='rect' />
        </Grid>
      </Grid>
    </Paper>
  );
}
