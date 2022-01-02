import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    background: 'url(https://positiveesolutions.com/images/background.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top',
  },
  container: {
    height: 'calc(100vh - 100px)',
    gap: 20,
  },
  circularProgress: {
    color: 'black',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default function LoadingIndicator() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container maxWidth='sm'>
        <Grid
          className={classes.container}
          container
          justify='center'
          alignItems='center'
          direction='column'
        >
          <Grid item>
            <CircularProgress className={classes.circularProgress} />
          </Grid>
          <Grid item>
            <Typography className={classes.text}>Loading...</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
