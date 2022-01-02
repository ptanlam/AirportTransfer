import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background:
      'url(https://static8.depositphotos.com/1303735/973/v/600/depositphotos_9732261-stock-illustration-airplanes-background.jpg)',
    backgroundSize: 'contain',
  },
  font: {
    color: '#fff',
    textShadow: '1px 1px 5px #000, 0px 0px 3px #2d88ff',
  },
});

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.box}>
      <Typography variant='h3' className={classes.font}>
        Oops! Page not found
      </Typography>
    </Box>
  );
}
