import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    background: '#fff',
  },
});

export default function AnonymousHome() {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.box}>
      <Typography variant='h2'>Please Sign in to continue</Typography>
    </Box>
  );
}
